#!/usr/bin/env bash
set -euo pipefail
echo "Running repo sanitizer: converting literal \\n/\\t into real newlines and tabs, making .bak copies..."

if ! command -v perl >/dev/null 2>&1; then
  echo "Perl is required. Install perl and re-run (eg: sudo apt install perl)."
  exit 2
fi

find_list=$(find src public -type f \( -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.css" -o -name "*.json" -o -name "*.md" \) 2>/dev/null || true)

if [ -z "$find_list" ]; then
  echo "No target files found in src/ or public/ — exiting."
  exit 0
fi

for f in $find_list; do
  cp -- "$f" "$f.bak"
  perl -0777 -pe '
    # Only do work if the file actually contains the two-character sequence "\" followed by "n" (i.e. backslash+n)
    if (index($_, "\\n") != -1 or index($_, "\\t") != -1 or index($_, "\\r") != -1) {
      s/\\r\\n/\
/g;            # literal \r\n -> newline (handles \r\n sequences embedded)
      s/\\n/\
/g;             # literal \n -> newline
      s/\\t/\t/g;    # literal \t -> tab
      s/\\r/\r/g;    # literal \r -> CR
      # Remove common stray scaffold noise lines that accidentally got embedded.
      s/\"nScaffold finished.*//gs;
      s/nScaffold finished.*//gs;
    }
  ' "$f" > "$f.tmp" && mv "$f.tmp" "$f"
  echo "fixed: $f (backup: $f.bak)"
done

if command -v dos2unix >/dev/null 2>&1; then
  echo "Running dos2unix on modified files..."
  for f in $find_list; do
    dos2unix "$f" >/dev/null 2>&1 || true
  done
fi

echo "Sanitization complete. Review the .bak files if anything looks off."
echo "Run: git status && git diff to inspect changes. Then run: npm run lint && npm run dev"

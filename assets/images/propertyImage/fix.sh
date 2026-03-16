for f in *_WebFile.*; do
  newname="${f/_WebFile./_webfile.}"
  git mv "$f" "${newname}.tmp"
  git mv "${newname}.tmp" "$newname"
done

for f in *_grayNoPics.*; do
  newname="${f/_grayNoPics./_graynopics.}"
  git mv "$f" "${newname}.tmp"
  git mv "${newname}.tmp" "$newname"
done

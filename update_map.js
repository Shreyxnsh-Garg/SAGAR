const fs = require('fs');

let content = fs.readFileSync('src/components/MapViewer.tsx', 'utf8');

const replacement = `
                {currentIncident.suspects.map((v) => {
                  let curLat, curLng;
                  if (timeOffset <= maxDelta) {
                    const f1 = timeOffset / maxDelta;
                    curLat = v.end[0] + (v.intercept[0] - v.end[0]) * f1;
                    curLng = v.end[1] + (v.intercept[1] - v.end[1]) * f1;
                  } else {
                    const f2 = (timeOffset - maxDelta) / (6.0 - maxDelta);
                    curLat = v.intercept[0] + (v.start[0] - v.intercept[0]) * f2;
                    curLng = v.intercept[1] + (v.start[1] - v.intercept[1]) * f2;
                  }

                  return (
                    <React.Fragment key={v.id}>
`;

content = content.replace(
  /\{currentIncident\.suspects\.map\(\(v\) => \{[\s\S]*?return \(\n\s*<React\.Fragment key=\{v\.id\}>/,
  replacement.trim()
);

fs.writeFileSync('src/components/MapViewer.tsx', content);

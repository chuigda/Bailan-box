// noinspection HtmlUnknownAttribute

export const adjustableHull = ({
  length,
  height,
  frontWidth,
  backWidth,
  frontSpread,
  backSpread,
  upCurve,
  downCurve,
  position,
  rotation
}) => `  <part id="0">
    <data length="${length}" height="${height}" frontWidth="${frontWidth}" backWidth="${backWidth}"
      frontSpread="${frontSpread || 0}" backSpread="${backSpread || 0}"
      upCurve="${upCurve || 0}" downCurve="${downCurve || 0}"
      heightScale="1" heightOffset="0" />
    <position x="${position.x}" y="${position.y}" z="${position.z}" />
    <rotation x="${rotation.x || 0}" y="${rotation.y || 0}" z="${rotation.z || 0}" />
    <scale x="1" y="1" z="1" />
    <color hex="6F6F6F" />
    <armor value="5" />
  </part>`

export const ship = (description, sections) => `<root>
  <ship author="自动摆烂" description="${description}" hornType="1" hornPitch="1" tracerCol="E53D4FFF">
${sections.reduce((x, y) => `${x}\n${y}`, '')}
  </ship>
</root>`

export const customPart = (description, sections, sizeX, sizeY, sizeZ, centerX, centerY, centerZ) => `<root>
  <customPart author="自动摆烂" description="${description}" Parts="${sections.length}"
              SizeX="${sizeX}" SizeY="${sizeY}" SizeZ="${sizeZ}"
              CenterX="${centerX}" CenterY="${centerY}" CenterZ="${centerZ}">
${sections.reduce((x, y) => `${x}\n${y}`, '')}
  </customPart>
</root>`

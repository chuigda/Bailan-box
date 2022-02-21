export const parseXML = xmlString => {
  const parser = new DOMParser()
  return parser.parseFromString(xmlString, 'text/xml')
}

export const serializeXML = xml => {
  const serializer = new XMLSerializer()
  return serializer.serializeToString(xml)
}

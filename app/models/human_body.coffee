human_body = () ->
  parts = []
  parts.push new Part("head")
  parts.push new Part("arm")
  parts.push new Part("leg")
  parts.push new Part("leg")
  parts.push new Part("arm")
  parts.push new Torso()
  return parts
human_body = () ->
  parts = []
  parts.push new Head()
  parts.push new Arm()
  parts.push new Part("leg")
  parts.push new Part("leg")
  parts.push new Arm()
  parts.push new Torso()
  return parts
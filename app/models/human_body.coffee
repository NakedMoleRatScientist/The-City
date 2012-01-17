human_body = () ->
  parts = []
  parts.push new Head()
  parts.push new Arm()
  parts.push new Leg("left")
  parts.push new Leg("right")
  parts.push new Arm()
  parts.push new Torso()
  return parts

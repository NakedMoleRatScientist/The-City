boar_body = () ->
  parts = []
  parts.push new Head()
  parts.push new Torso()
  parts.push new Leg("right_leg")
  parts.push new Leg("left_leg")
  parts.push new Leg("hind_left_leg")
  parts.push new Leg("hind_right_leg")
  return parts
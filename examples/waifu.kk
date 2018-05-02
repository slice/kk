if bool(">", argslength(), 0) {
  // Hash the user's ID.
  waifuhash = hash(userid(args()))

  // Calculate waifu rating using a secret formula.
  rating = math("%",
    if bool("<", waifuhash, 0) {
      math("*", waifuhash, -1)
    } else {
      waifuhash
    },
    100
  )

  emoji = if bool("<=", rating, 60) {
    "💔"
  } else {
    "❤"
  }

  emoji " I'd rate " usernick(args()) " as " math("/", rating, 10) "/10! " emoji
} else {
  // Show a help message.
  "Calculate the waifu rating of any user."
}

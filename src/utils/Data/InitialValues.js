export const LoginForm = {
  username: "",
  password: "",
}

export const SignupForm = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
}

export const DateSearch = {
  // startDate: new Date("2022-11-01T06:49:33.000Z"),
  startDate: new Date(),
  endDate: new Date(),
}

export const NameSearch = {
  name: "-",
  mobile: "",
}

export const price = {
  shirt_price: 0,
  pant_price: 0
}

export const CreateCustomer = {
  c_id: 0,
  name: "",
  phone: "",
  phone2: "",
  address: "",
}

export const checked = {
  shirt: false,
  pant: false,
}

export const belt_type = [
  {
    name: "1.25",
    value: "1.25"
  },
  {
    name: "1.5",
    value: "1.5"
  },
  {
    name: "1.25 Cut",
    value: "1.25 Cut"
  },
  {
    name: "1.5 Cut",
    value: "1.5 Cut"
  }
]

export const Pocket_Type = [
  {
    name: "Cross",
    value: "cross"
  },
  {
    name: "Side",
    value: "side"
  }
]

export const Pocket_Strip = [
  {
    name: "In",
    value: "in"
  },
  {
    name: "Out 1in",
    value: "1 inch"
  },
  {
    name: "Out 1.25in",
    value: "1.25 inch"
  },
  {
    name: "Out 1.5in",
    value: "1.5 inch"
  },
]

export const Shirt_type = [
  {
    name: "Open Shirt",
    value: "ઓપન શર્ટ"
  },
  {
    name: "Bu Shirt",
    value: "બુશર્ટ"
  },
  {
    name: "Bu Shirt Cut",
    value: "બુશર્ટ-કટ"
  },
  {
    name: "Safari",
    value: "સફારી"
  },
  {
    name: "Kafni",
    value: "કફની"
  },
  {
    name: "Kurtu",
    value: "કુર્તુ"
  }
]

export const jobData = {
  shirt_quantity: 0,
  pant_quantity: 0,
  createdAt: new Date(),
  returnDate: new Date(),
  totalPrice: 0,
  shirt_data: {
    s_length: 0.00,
    shoulder: 0.00,
    sleeve: 0.00,
    cuff: 0.00,
    chest: 0.00,
    waist: 0.00,
    seat: 0.00,
    pocket: 0.00,
    collar: 0.00,
    strip: "",
    shirt_type: "",
    description: "",
    price: 350,
  },
  pant_data: {
    p_length: 0.00,
    waist: 0.00,
    jholo: 0.00,
    seat: 0.00,
    thighs: 0.00,
    knee: 0.00,
    bottom: 0.00,
    back_pocket: 0,
    chipti: 0,
    pocket_type: "",
    belt_type: "",
    description: "",
    price: 450,
  }
}


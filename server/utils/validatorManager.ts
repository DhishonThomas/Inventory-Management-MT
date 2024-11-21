
export function customerValidator(name: string, address: string, mobile: number) {
  if (name.length >= 3) {
    const result = {
      status: false,
      message: "Name want to be more that 2 letters",
    };
    return result;
  } else if (address.length >= 4) {
    const result = {
      status: false,
      message: "Address want to be more that 3 letters",
    };
    return result;
  } else if (mobile + "".length === 10) {
    const result = { status: false, message: "Numbers want to 10" };
    return result;
  }

  return { status: true, message: "Every field is validated" };
}


export function customerValidator(name: string, address: string, mobile: number) {
  if (name.length <= 2) {
    const result = {
      status: false,
      message: "Name want to be more that 2 letters",
    };
    return result;
  } else if (address.length <= 3) {
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



export function InventoryValidator(name: string, description: string,quantity:number, price: number) {
  if (name.length <= 2) {
    const result = {
      status: false,
      message: "Name want to be more that 2 letters",
    };
    return result;
  } else if (description.length >= 200) {
    const result = {
      status: false,
      message: "Description cannot be more that 200 letters or space",
    };
    return result;
  } else if (quantity<0) {
    const result = { status: false, message: "Quantity want to be more that 0" };
    return result;
  } else if (price<0) {
    const result = { status: false, message: "Price want to be more that 0" };
    return result;
  }

  return { status: true, message: "Every field is validated" };
}


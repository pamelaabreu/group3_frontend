const fs = require("fs");
/*

ITEM ARRAYS

*/

const clothing = [
  "Shirts",
  "Tops",
  "Socks",
  "Bra",
  "Underwear",
  "Belt",
  "Dress",
  "Long Pants",
  "Hat",
  "Cap",
  "Beanie",
  "Flip-Flops",
  "Sandals",
  "Shoes",
  "Boots",
  "Short Pants",
  "Skirt",
  "Bathing Suit",
  "Towel",
  "Pajamas",
  "Long Underwear",
  "Leggings",
  "Sweater",
  "Small Bag",
  "Purse",
  "Large Bag",
  "Bookbag",
  "Light Jacket",
  "Rain Coat",
  "Heavy Jacket",
  "Scarf",
  "Gloves"
];

const accessories = [
  "Reading Glasses",
  "Sunglasses",
  "Pocketknife",
  "Luggage Label",
  "Earplugs",
  "Wallet",
  "Pen",
  "Umbrella",
  "Travel Pillow"
];

const electronics = [
  "Tripod",
  "Mobile Phone",
  "Camera",
  "SD Card",
  "Laptop",
  "Tablet",
  "USB Stick",
  "Cellphone Charger",
  "Laptop",
  "Tablet Charger",
  "Headphones",
  "Travel Adaptor"
];

const personals = [
  "Toothbrush",
  "Toothbrush Cover",
  "Floss",
  "Toothpaste",
  "Mouthwash",
  "Conditoner",
  "Shower Gel",
  "Shampoo",
  "Fragrance",
  "Sunscreen",
  "Sun Tan Lotion",
  "Condoms",
  "Hair Gel",
  "Spray",
  "Brush",
  "Cream",
  "Eye Mask",
  "Nail Clippers",
  "Q-tips",
  "Pocket Mirror",
  "Hair-dryer",
  "Shaving Gel",
  "Glasses",
  "Hand Sanitizer",
  "Contacts",
  "Contacts Solution",
  "Hair Ties",
  "Razor",
  "Makeup",
  "Jewelery",
  "Tampons",
  "Pads",
  "Deodorant"
];

const documents = [
  "Photocopies of Documents",
  "ID",
  "Tickets",
  "Passport",
  "Identity Card",
  "Visa",
  "Driver's License",
  "Wallet",
  "International Driver's License",
  "Boarding Pass",
  "Vouchers",
  "Travel Insurance Documents",
  "Vaccination Card",
  "Money",
  "Cash",
  "Foreign",
  "Currency",
  "Credit Card",
  "Debit Card",
  "Notebook",
  "Guidebook",
  "Printed Trip Itinerary",
  "Accommodation Reservation",
  "Contact Information",
  "Book"
];

const firstAid = [
  "Pain Killers",
  "Medications",
  "Patches",
  "Vitamins",
  "Drugs",
  "Prescriptions",
  "Tweezers"
];

const essentials = ["House Key", "Money Belt"];

const children = [
  "Onesies",
  "Socks",
  "Trousers",
  "Long Sleeve Shirts",
  "Sweater",
  "Jacket",
  "Raincoat",
  "Bathing Suit",
  "Hat",
  "Pajamas",
  "Shoes",
  "Boots"
];

const backpack = [
  "Travel Pillow",
  "Book",
  "Kindle",
  "Phone",
  "Phone Charger",
  "Portable Charger",
  "Snacks",
  "Blanket",
  "Camera",
  "Candy",
  "Chapstick",
  "Charger",
  "Headphones",
  "Glasses",
  "Gum",
  "Mints",
  "Hand-Sanitizer",
  "Earbuds",
  "iPhone Charger",
  "Laptop",
  "Lip Balm",
  "Lotion",
  "Money",
  "Notebook",
  "Pen",
  "Phone",
  "Tissue",
  "Water Bottle"
];

const read = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./items.json", (data, err) => {
      if (err) reject(err);
      else resolve(JSON.parse(data));
      // else resolve(data)
    });
  });
};

const write = content => {
  // content = content.toString();
  content = JSON.stringify(content);
  return new Promise((resolve, reject) => {
    fs.writeFile("./items.json", content, "utf-8", err => {
      if (err) reject(err);
      else resolve();
    });
  });
};
var array = [];
const buildObjectArray = (category, arr, bag_type) => {
  // const array = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    array.push({
      name: item,
      quantity: { 2: 1, 4: 2, 7: 2, 10: 3, 14: 4 },
      bag_type: bag_type,
      category: category
    });
  }
  // return array;
};
// itemsObject = {general:{}};
// itemsObject.general['clothing'] = buildObjectArray('clothing', clothing, 'checked');
// itemsObject.general['accessories'] = buildObjectArray('accessories', accessories, 'personal');
// itemsObject.general['electronics'] = buildObjectArray('electronics', electronics, 'carry-on');
// itemsObject.general['personals'] = buildObjectArray('personals', personals, 'carry-on');
// itemsObject.general['documents'] = buildObjectArray('documents', documents, 'personal');
// itemsObject.general['first-aid'] = buildObjectArray('first-aid', firstAid, 'checked');
// itemsObject.general['essentials'] = buildObjectArray('essentials', essentials, 'carry-on');
// itemsObject.general['children'] = buildObjectArray('children', children, 'checked');
// itemsObject.general['misc'] = buildObjectArray('misc', backpack, 'checked');
const itemsObject = { general: [] };
// const array = []
buildObjectArray("clothing", clothing, "checked");
buildObjectArray("accessories", accessories, "personal");
buildObjectArray("electronics", electronics, "carry-on");
buildObjectArray("personals", personals, "carry-on");
buildObjectArray("documents", documents, "personal");
buildObjectArray("first-aid", firstAid, "checked");
buildObjectArray("essentials", essentials, "carry-on");
buildObjectArray("children", children, "checked");
buildObjectArray("misc", backpack, "checked");
console.log(array);
itemsObject.general = array;
// console.log(itemsObject);

write(itemsObject)
  .then(_ => {
    console.log("success!");
    return read();
  })
  .then(data => {
    console.log("data: ", data);
  })
  .catch(err => {
    console.log("err: ", err.toString());
  });

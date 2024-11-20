const names = [
  "John",
  "Sarah",
  "Mike",
  "Damon",
  "Arya",
  "Denerys",
  "Pelumi",
  "Samuel",
];
const surnames = [
  "targeryan",
  "Breackish",
  "Wood",
  "Segunmaru",
  "Kalu",
  "Nwankwo",
];
const bank = ["access bank"];

const crd_acc_numbers = ["0000002217", "0000007494", "0000004730"];

const deb_acc_numbers = ["0000002217", "0000007494", "0000004730"];

const amounts = ["100", "1000000", "1000000", "1000", "10000", "20000"]

const acc_numbers = ["0000002217", "0000007494", "0000004730"];

function generateRandomNumber(length) {
  if (length <= 0 || !Number.isInteger(length)) {
    throw new Error("Length must be a positive integer.");
  }

  const min = Math.pow(10, length - 1); // Minimum value with the given length
  const max = Math.pow(10, length) - 1; // Maximum value with the given length

  // Generate a random number between min and max (inclusive)
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
}

function getRandomNumber() {
    return Math.floor(Math.random() * 4); // 4 is exclusive, so it generates 0, 1, 2, or 3
}
    
function formatDate(date) {
  const padZero = (num) => (num < 10 ? "0" : "") + num;

  const day = padZero(date.getDate());
  const month = padZero(date.getMonth() + 1); // Months are zero-based in JavaScript
  const year = date.getFullYear();

  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  const seconds = padZero(date.getSeconds());

  const milliseconds = date.getMilliseconds();
  const formattedMilliseconds =
    milliseconds < 100
      ? (milliseconds < 10 ? "00" : "0") + milliseconds
      : milliseconds;

  return `${day}-${month}-${year} ${hours}:${minutes}.${formattedMilliseconds}`;
}

const generateCSVFile = (numberToGenerate) => {
  const ref = generateRandomNumber(11);
  const date = formatDate(new Date());
  const amount = amounts[getRandomNumber()]

  const debAct = acc_numbers[Math.floor(Math.random() * acc_numbers.length)];
  const crdAct = acc_numbers[Math.floor(Math.random() * acc_numbers.length)];

  // const debAct = "0500592358"
  // const crdAct = "0501115310"
  const narration = "This is just a random reference";
  const debitReferenceNumber = generateRandomNumber(8);
  const originalPayerBank = bank[Math.floor(Math.random() * bank.length)];
  const transitToMirror = 0;
  const originalPayerAccount = generateRandomNumber(10);

  const originalPayerName = `${
    names[Math.floor(Math.random() * names.length)]
  } ${surnames[Math.floor(Math.random() * surnames.length)]}`;

  const originalPayerAddress = "This is a random address";

  return `${ref},${date},${amount},${debAct},${crdAct},${narration},${debitReferenceNumber},${originalPayerBank},${transitToMirror},${originalPayerAccount},${originalPayerName},${originalPayerAddress},`;
};

genearteGeneralCSVFile = (number) => {
  let csvFile = "";

  for (var i = 0; i < number; i++) {
    console.log("working");
    const temp = generateCSVFile();

    csvFile = csvFile + "\n" + temp;
  }

  console.log(csvFile);
};

genearteGeneralCSVFile(100);

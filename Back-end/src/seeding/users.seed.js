import { config } from "dotenv";
import connectDb from "../db/connection.js";
import User from "../db/models/user.model.js";
import { genders } from "../utils/Genders/index.js";

config();

const seedUsers = [
  {
    email: "scarlett.johansson@globomail.com",
    fullName: "Scarlett Johansson",
    password: "StrongPass1!",
    phone: "01234567890",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=42",
  },
  {
    email: "florence.pugh@fastmail.com",
    fullName: "Florence Pugh",
    password: "SecurePwd#2",
    phone: "01112223344",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=2",
  },
  {
    email: "zendaya.coleman@inbox.com",
    fullName: "Zendaya Coleman",
    password: "KeyWord!321",
    phone: "01555666777",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=12",
  },
  {
    email: "gal.gadot@ymail.com",
    fullName: "Gal Gadot",
    password: "MySecretCode$",
    phone: "01098765432",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=5",
  },
  {
    email: "margot.robbie@mail.org",
    fullName: "Margot Robbie",
    password: "SafeAndSound%",
    phone: "01222333444",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=1",
  },
  {
    email: "ana.de.armas@proton.me",
    fullName: "Ana de Armas",
    password: "TopSecret#9",
    phone: "01155544433",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=7",
  },
  {
    email: "scarlett.byrne@zohomail.com",
    fullName: "Scarlett Byrne",
    password: "LuckyNumber7&",
    phone: "01011223344",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=10",
  },
  {
    email: "elizabeth.olsen@aol.com",
    fullName: "Elizabeth Olsen",
    password: "MagicWord!@",
    phone: "01230001122",
    gender: genders.FEMALE,
    profilePicture: "https://i.pravatar.cc/150?img=3",
  },
  {
    email: "chris.evans@globomail.com",
    fullName: "Chris Evans",
    password: "ShieldUp123!",
    phone: "01119998877",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=33",
  },
  {
    email: "robert.downeyjr@fastmail.com",
    fullName: "Robert Downey Jr.",
    password: "IronManRules#4",
    phone: "01555111222",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=8",
  },
  {
    email: "tom.holland@inbox.com",
    fullName: "Tom Holland",
    password: "SpiderSense$5",
    phone: "01022334455",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=15",
  },
  {
    email: "chris.hemsworth@ymail.com",
    fullName: "Chris Hemsworth",
    password: "ThorPower%6",
    phone: "01222999000",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=22",
  },
  {
    email: "mark.ruffalo@mail.org",
    fullName: "Mark Ruffalo",
    password: "HulkSmash&7",
    phone: "01133445566",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=18",
  },
  {
    email: "jeremy.renner@proton.me",
    fullName: "Jeremy Renner",
    password: "HawkeyeAim*8",
    phone: "01044556677",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=25",
  },
  {
    email: "paul.rudd@zohomail.com",
    fullName: "Paul Rudd",
    password: "AntManSize^9",
    phone: "01234123412",
    gender: genders.MALE,
    profilePicture: "https://i.pravatar.cc/150?img=30",
  },
];

const seedDatabase = async () => {
  try {
    await connectDb();

    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log("Users already seeded. Skipping seeding.");
      return;
    }

    await User.insertMany(seedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};


seedDatabase();
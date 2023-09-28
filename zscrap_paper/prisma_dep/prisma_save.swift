// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model User {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  // phoneNumber String @unique // include with country code (without + sign) and area code
  // phoneVerified DateTime? // verified on Twilio
  email String? @unique // include with country code (without + sign) and area code
  name String?
  image String?
  hashedPassword String? // not sure how to handle if user signs up with Google Auth
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // countryCode String
  // favoriteIds String[] @db.ObjectId
  invite Invite[]
  list List[]
  availabilityPosting AvailabilityPosting[]
  timeslot Timeslot[]
  // reservation Reservation[]
}

model Invite {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  // phoneNumber String @unique // include with country code (without + sign) and area code
  // phoneVerified DateTime? // verified on Twilio
  // email String? @unique // include with country code (without + sign) and area code
  userId String @db.ObjectId
  name String?
  phoneNumber String?
  // image String?
  // hashedPassword String? // not sure how to handle if user signs up with Google Auth
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  // countryCode String
  // favoriteIds String[] @db.ObjectId
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model List {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  type String? // favorites, friends, family, work, etc
  name String?
  phoneNumberList String
  // provider String
  // providerAccountId String
  // refresh_token String? @db.String
  // access_token String?
  // expires_at Int?
  // token_type String?
  // scope String?
  // id_token String?
  // session_state String?
// ????  @@unique([ provider, providerAccountId])
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  // timeslot Timeslot[]
  // listItems ListItem[]
}

// model ListItem {
//   id String @id @default(auto()) @map("_id") @db.ObjectId
//   userId String @db.ObjectId
//   listId String @db.ObjectId
//   phoneNumber String
//   user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//   list List @relation(fields: [listId], references: [id])
//   reservations Reservation[]
// }

model AvailabilityPosting {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  email String?
  createdAt DateTime @default(now())
  availabilityStart DateTime
  availabilityEnd DateTime
  duration Int // length of each slot in minutes
  phoneNumbers String
  category String?
  participantCount Int?
  title String?
  PricePerSlot Int?
  // startTime DateTim
  // listId String @db.ObjectId
  // SlotLengthInMin Int
  user User @relation(fields: [userId], references: [id], onDelete: Cascade) 
  // list List @relation(fields: [listId], references: [id])
  timeslot Timeslot []
}

model Timeslot {
  id String @id @default(auto()) @map("_id") @db.ObjectId
  userId String @db.ObjectId
  availabilityPostingId String @db.ObjectId
  email String?
  createdAt DateTime @default(now())
  availabilityStart DateTime
  availabilityEnd DateTime
  // duration Int // length of each slot in minutes
  // phoneNumbers String
  // category String?
  // participantCount Int?
  // title String?
  // PricePerSlot Int?
  // startTime DateTim
  // listId String @db.ObjectId
  // SlotLengthInMin Int
  user User @relation(fields: [userId], references: [id], onDelete: Cascade) 
  availabilityPosting AvailabilityPosting @relation(fields: [availabilityPostingId], references: [id], onDelete: Cascade)
  // list List @relation(fields: [listId], references: [id])
  // reservation Reservation []
}

// model Reservation {
//   id String @id @default(auto()) @map("_id") @db.ObjectId
//   createdAt DateTime @default(now())
//   timeslotId String @db.ObjectId
//   // listItemId String
//   userId String @db.ObjectId
//   callerNumber String @db.ObjectId
//   paid Boolean @default(false)
//   price Int
//   // isCallerAlreadyUser Boolean @default(false)s
//   user User @relation(fields: [userId], references: [id], onDelete: Cascade)
//   timeslot Timeslot @relation(fields: [timeslotId], references: [id], onDelete: Cascade)
// }
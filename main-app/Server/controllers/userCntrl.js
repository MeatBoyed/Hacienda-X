import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { SignUp } from "@clerk/nextjs";
import bcrypt from 'bcrypt';

async function clerkSignUp(userData) {
  try {

    const signUpResponse = await clerk.signUp(userData);
    
    return signUpResponse;
  } catch (error) {

    console.error('Error during sign-up:', error);
    throw new Error('Sign-up failed')
  }
}

export default clerkSignUp;

export const handleSignUpWithClerk = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Sign up the user with Clerk
    const clerkResponse = await clerkSignUp({ email, password: hashedPassword });

    // Extract necessary user information from Clerk's response
    const { email: clerkEmail } = clerkResponse.user;

    // Create a new user record in your database
    const newUser = await prisma.user.create({
      data: {
        email: clerkEmail,
        password: hashedPassword,
        // Additional fields as needed
      },
    });

    // Respond with success message and user information
    res.status(201).json({ message: 'User created successfully', user: { email: newUser.email } });
  } catch (error) {
    console.error('Error during sign-up:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export const createUser = asyncHandler(async (req, res) => {
  console.log("Creating a user");

  let { email, password } = req.body;

  const userExists = await prisma.user.findUnique({ where: { email: email } });

  if (!userExists) {
    const user = await prisma.user.create({
      data: { username: email, email: email, password: password },
    });
    res.send({ message: "User registered successfully" });
  } else {
    res.status(201).send({ message: "User already registered" });
  }
});

export const bookVisit = asyncHandler(async (req, res) => {
  const { email, date } = req.body;
  const { id } = req.params;

  try {
    const alreadyBooked = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    if (!alreadyBooked) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
      res
        .status(400)
        .json({ message: "This residency is already booked by you" });
    } else {
      await prisma.user.update({
        where: { email: email },
        data: {
          bookedVisits: { push: { id, date } },
        },
      });
      res.send("Your visit is booked successfully");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Function to get all bookings for a user
export const getAllBookings = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const bookings = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    res.status(200).send(bookings);
  } catch (err) {
    throw new Error(err.message);
  }
});

// Function to cancel the booking
export const cancelBooking = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { bookedVisits: true },
    });
    const index = user.bookedVisits.findIndex((visit) => visit.id === id);
    if (index === -1) {
      res.status(404).json({ message: "Booking not found" });
    } else {
      user.bookedVisits.splice(index, 1);
      await prisma.user.update({
        where: { email },
        data: { bookedVisits: user.bookedVisits },
      });
      res.send("Booking cancelled successfully");
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// Function to add a residency to the favorite list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { rid } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favResidenciesID.includes(rid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            set: user.favResidenciesID.filter((id) => id !== rid),
          },
        },
      });

      res.send({ message: "Removed from favorites", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favResidenciesID: {
            push: rid,
          },
        },
      });
      res.send({ message: "Updated user", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// Function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favResd = await prisma.user.findUnique({
      where: { email },
      select: { favResidenciesID: true },
    });
    res.status(200).send(favResd);
  } catch (err) {
    throw new Error(err.message);
  }
});

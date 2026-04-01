import product1 from "@/assets/products/product-1.jpg";
import product2 from "@/assets/products/product-2.jpg";
import product3 from "@/assets/products/product-3.jpg";
import product4 from "@/assets/products/product-4.jpg";
import product5 from "@/assets/products/product-5.jpg";
import product6 from "@/assets/products/product-6.jpg";
import product7 from "@/assets/products/product-7.jpg";
import product8 from "@/assets/products/product-8.jpg";
import product9 from "@/assets/products/product-9.jpg";

export interface Product {
  slug: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  sale?: boolean;
  rating: number;
  category: string;
  description: string;
  details: string[];
}

export const products: Product[] = [
  {
    slug: "pressure-monitor",
    name: "Pressure Monitor",
    price: 150,
    image: product1,
    sale: true,
    rating: 4,
    category: "Medical Devices",
    description: "Accurate digital blood pressure monitor designed for easy home use. Features a large LCD display with clear readings, irregular heartbeat detection, and memory storage for up to 120 readings. Ideal for daily health monitoring of senior patients.",
    details: [
      "Large backlit LCD display",
      "Irregular heartbeat detection",
      "Memory for 120 readings",
      "One-touch operation",
      "Includes carrying case",
    ],
  },
  {
    slug: "comfort-wheelchair",
    name: "Comfort Wheelchair",
    price: 200,
    oldPrice: 250,
    image: product2,
    rating: 4,
    category: "Mobility Aids",
    description: "Lightweight and colorful wheelchair built for comfort and ease of use. Features padded armrests, adjustable footrests, and a foldable frame for convenient storage and transport. Suitable for both indoor and outdoor use.",
    details: [
      "Lightweight aluminum frame",
      "Padded armrests & seat cushion",
      "Adjustable footrests",
      "Foldable for easy storage",
      "Weight capacity: 250 lbs",
    ],
  },
  {
    slug: "walking-cane",
    name: "Walking Cane",
    price: 45,
    image: product3,
    sale: true,
    rating: 5,
    category: "Mobility Aids",
    description: "Classic wooden walking cane with an ergonomic T-handle grip. Handcrafted from premium hardwood with a non-slip rubber tip for secure footing on any surface. Adjustable height to suit different users.",
    details: [
      "Premium hardwood construction",
      "Ergonomic T-handle grip",
      "Non-slip rubber tip",
      "Adjustable height: 30\"–39\"",
      "Supports up to 300 lbs",
    ],
  },
  {
    slug: "digital-thermometer",
    name: "Digital Thermometer",
    price: 30,
    image: product4,
    sale: true,
    rating: 4,
    category: "Medical Devices",
    description: "Non-contact infrared digital thermometer providing instant, accurate temperature readings. Features a fever alert system, backlit display for easy reading, and stores up to 32 previous measurements.",
    details: [
      "Non-contact infrared technology",
      "Instant readings in 1 second",
      "Fever alert indicator",
      "Stores 32 previous readings",
      "Auto shut-off to save battery",
    ],
  },
  {
    slug: "first-aid-kit",
    name: "First Aid Kit",
    price: 120,
    oldPrice: 150,
    image: product5,
    rating: 4,
    category: "Safety & Emergency",
    description: "Comprehensive first aid kit containing over 150 essential medical supplies. Organized in a durable, waterproof hard case for quick access during emergencies. Perfect for home care settings and travel.",
    details: [
      "150+ medical supplies included",
      "Waterproof hard case",
      "Organized compartments",
      "Includes emergency guide",
      "Compact & portable design",
    ],
  },
  {
    slug: "pill-organizer",
    name: "Pill Organizer",
    price: 25,
    image: product6,
    sale: true,
    rating: 5,
    category: "Daily Living",
    description: "Weekly pill organizer with individual daily compartments to help manage medication schedules. Clear lid design makes it easy to verify contents at a glance. BPA-free and dishwasher safe.",
    details: [
      "7-day compartments",
      "Clear lid for easy viewing",
      "BPA-free material",
      "Dishwasher safe",
      "Compact travel-friendly size",
    ],
  },
  {
    slug: "pulse-oximeter",
    name: "Pulse Oximeter",
    price: 60,
    image: product7,
    sale: true,
    rating: 4,
    category: "Medical Devices",
    description: "Fingertip pulse oximeter for measuring blood oxygen saturation (SpO2) and pulse rate. Features a bright OLED display, lanyard attachment, and automatic power-off. Essential for respiratory health monitoring.",
    details: [
      "SpO2 & pulse rate measurement",
      "Bright OLED display",
      "Automatic power-off",
      "Includes lanyard & batteries",
      "Suitable for all ages",
    ],
  },
  {
    slug: "home-care-bed",
    name: "Home Care Bed",
    price: 899,
    oldPrice: 1099,
    image: product8,
    rating: 5,
    category: "Furniture",
    description: "Fully adjustable electric hospital bed designed for home care use. Features head and foot elevation controls, lockable casters, side rails, and an IV pole attachment. Built for patient comfort and caregiver convenience.",
    details: [
      "Electric head & foot adjustment",
      "Lockable casters for safety",
      "Detachable side rails",
      "IV pole attachment included",
      "Weight capacity: 450 lbs",
    ],
  },
  {
    slug: "comfort-chair",
    name: "Comfort Chair",
    price: 350,
    image: product9,
    sale: true,
    rating: 4,
    category: "Furniture",
    description: "Ergonomic recliner chair designed specifically for seniors. Features smooth reclining mechanism, lumbar support, padded armrests, and easy-to-clean upholstery. Provides exceptional comfort for extended sitting.",
    details: [
      "Smooth reclining mechanism",
      "Built-in lumbar support",
      "Padded armrests",
      "Easy-to-clean upholstery",
      "Weight capacity: 300 lbs",
    ],
  },
];

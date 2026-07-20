import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 48;

let currentValue = false;
let isListening = false;
let animationFrame = null;

const subscribers = new Set();

function readScrollState() {
  if (typeof window === "undefined") return false;

  return window.scrollY > SCROLL_THRESHOLD;
}

function notifySubscribers() {
  const nextValue = readScrollState();

  if (nextValue === currentValue) return;

  currentValue = nextValue;

  subscribers.forEach((subscriber) => {
    subscriber(currentValue);
  });
}

function handleScroll() {
  if (animationFrame !== null) return;

  animationFrame = window.requestAnimationFrame(() => {
    animationFrame = null;
    notifySubscribers();
  });
}

function startListening() {
  if (typeof window === "undefined" || isListening) return;

  currentValue = readScrollState();

  window.addEventListener("scroll", handleScroll, {
    passive: true,
  });

  isListening = true;
}

function stopListening() {
  if (typeof window === "undefined" || !isListening || subscribers.size > 0) {
    return;
  }

  window.removeEventListener("scroll", handleScroll);

  if (animationFrame !== null) {
    window.cancelAnimationFrame(animationFrame);
    animationFrame = null;
  }

  isListening = false;
}

export default function useHeaderScrolled() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    subscribers.add(setScrolled);

    startListening();

    setScrolled(currentValue);

    return () => {
      subscribers.delete(setScrolled);
      stopListening();
    };
  }, []);

  return scrolled;
}

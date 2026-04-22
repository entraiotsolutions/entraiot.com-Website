"use client";

import {
  useEffect,
  useMemo,
  useState,
  type PointerEventHandler,
} from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, Mail, PhoneCall, X } from "lucide-react";
import styles from "./futuristic-intro-overlay.module.css";

type FuturisticIntroOverlayProps = {
  onDismiss: () => void;
};

type BookingValues = {
  date: string;
  time: string;
};

type WhatWeDoTone = "iot" | "dashboards" | "predictive" | "automation" | "apps" | "uiux";
type WhatWeDoItem = {
  title: string;
  description: string;
  tone: WhatWeDoTone;
};

type CalendarCell = {
  key: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
};

const BOOKING_STORAGE_KEY = "entraiot:intro-booking";
const EXTERNAL_BOOK_APPOINTMENT_URL =
  "https://rytzuforms.web.app/org/dzeId1Bzx6Vdy4n2m8aq7YzFIz03/form/BW4JNqTuRr26ssQbcn5y";
const ENTER_EASE = [0.22, 1, 0.36, 1] as const;
const EXIT_EASE = [0.4, 0, 1, 1] as const;
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const TIME_SLOTS = [
  "09:00",
  "09:30",
  "10:00",
  "11:00",
  "12:00",
  "12:30",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "17:30",
  "18:00",
];

const SHOWCASE_CARD = {
  title: "AI-powered workflow dashboard",
  image: "/RFID2.webp",
} as const;

const WHAT_WE_DO_ITEMS = [
  {
    title: "End-to-End IoT Deployment",
    description: "Seamless setup from sensors to cloud with scalable infrastructure.",
    tone: "iot",
  },
  {
    title: "Real-Time Dashboards",
    description: "Live data visualization for faster, smarter decision-making.",
    tone: "dashboards",
  },
  {
    title: "Predictive Maintenance",
    description: "AI-driven insights to detect issues early and reduce downtime.",
    tone: "predictive",
  },
  {
    title: "Smart Automation",
    description: "Secure, intelligent automation to streamline operations.",
    tone: "automation",
  },
  {
    title: "Application Development",
    description: "Custom apps integrating AI and IoT for full system control.",
    tone: "apps",
  },
  {
    title: "Custom UI/UX Interfaces",
    description: "Intuitive designs that simplify complex data interactions.",
    tone: "uiux",
  },
] satisfies readonly WhatWeDoItem[];

function dateToKey(date: Date): string {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, "0");
  const day = `${date.getDate()}`.padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function parseDateKey(value: string): Date | null {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function createCalendarCells(displayMonth: Date): CalendarCell[] {
  const year = displayMonth.getFullYear();
  const month = displayMonth.getMonth();
  const firstDay = new Date(year, month, 1);
  const startOffset = firstDay.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPreviousMonth = new Date(year, month, 0).getDate();
  const todayKey = dateToKey(new Date());
  const cells: CalendarCell[] = [];

  for (let index = 0; index < 42; index += 1) {
    if (index < startOffset) {
      const day = daysInPreviousMonth - startOffset + index + 1;
      const date = new Date(year, month - 1, day);
      const key = dateToKey(date);
      cells.push({ key, day, isCurrentMonth: false, isToday: key === todayKey });
      continue;
    }

    if (index >= startOffset + daysInMonth) {
      const day = index - (startOffset + daysInMonth) + 1;
      const date = new Date(year, month + 1, day);
      const key = dateToKey(date);
      cells.push({ key, day, isCurrentMonth: false, isToday: key === todayKey });
      continue;
    }

    const day = index - startOffset + 1;
    const date = new Date(year, month, day);
    const key = dateToKey(date);
    cells.push({ key, day, isCurrentMonth: true, isToday: key === todayKey });
  }

  return cells;
}

function getStoredBooking(): BookingValues {
  try {
    const raw = localStorage.getItem(BOOKING_STORAGE_KEY);
    if (!raw) {
      return { date: "", time: "" };
    }

    const parsed = JSON.parse(raw) as Partial<BookingValues>;
    return {
      date: parsed.date ?? "",
      time: parsed.time ?? "",
    };
  } catch {
    return { date: "", time: "" };
  }
}

export default function FuturisticIntroOverlay({ onDismiss }: FuturisticIntroOverlayProps) {
  const [booking, setBooking] = useState<BookingValues>({ date: "", time: "" });
  const [displayMonth, setDisplayMonth] = useState<Date>(() => monthStart(new Date()));
  const [bookingReady, setBookingReady] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [redirectTarget, setRedirectTarget] = useState<"none" | "signup">("none");
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const rotateX = useSpring(useTransform(pointerY, [-0.5, 0.5], [4.2, -4.2]), {
    stiffness: 130,
    damping: 22,
    mass: 0.55,
  });
  const rotateY = useSpring(useTransform(pointerX, [-0.5, 0.5], [-5.4, 5.4]), {
    stiffness: 130,
    damping: 22,
    mass: 0.55,
  });

  useEffect(() => {
    const stored = getStoredBooking();
    setBooking(stored);

    if (stored.date) {
      const parsedDate = parseDateKey(stored.date);
      if (parsedDate) {
        setDisplayMonth(monthStart(parsedDate));
      }
    }

    setBookingReady(true);
  }, []);

  useEffect(() => {
    if (!bookingReady) {
      return;
    }

    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(booking));
  }, [booking, bookingReady]);

  useEffect(() => {
    if (isOpen) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      onDismiss();

      if (redirectTarget === "signup") {
        window.location.assign("/contact");
      }
    }, 430);

    return () => window.clearTimeout(timeoutId);
  }, [isOpen, onDismiss, redirectTarget]);

  const panelVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.9, y: 12, filter: "blur(8px)" },
      visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.55, ease: ENTER_EASE },
      },
      exit: {
        opacity: 0,
        scale: 0.95,
        y: 10,
        transition: { duration: 0.3, ease: EXIT_EASE },
      },
    }),
    []
  );

  const calendarCells = useMemo(() => createCalendarCells(displayMonth), [displayMonth]);
  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }).format(displayMonth),
    [displayMonth]
  );

  const selectedDateLabel = useMemo(() => {
    if (!booking.date) {
      return "No date selected";
    }

    const parsedDate = parseDateKey(booking.date);
    if (!parsedDate) {
      return "No date selected";
    }

    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(parsedDate);
  }, [booking.date]);

  const handleClose = () => {
    setRedirectTarget("none");
    setIsOpen(false);
  };

  const handleBook = () => {
    setValidationMessage("");
  };

  const handleSignUp = () => {
    setValidationMessage("");
    setRedirectTarget("signup");
    setIsOpen(false);
  };

  const handleDateSelect = (cell: CalendarCell) => {
    setBooking((current) => ({ ...current, date: cell.key }));
    setValidationMessage("");

    if (!cell.isCurrentMonth) {
      const parsed = parseDateKey(cell.key);
      if (parsed) {
        setDisplayMonth(monthStart(parsed));
      }
    }
  };

  const handleTimeSelect = (time: string) => {
    const newBooking = { ...booking, time };
    setBooking(newBooking);
    setIsTimePickerOpen(false);
    setValidationMessage("");
    
    // Dispatch event for Chatbot
    if (newBooking.date && newBooking.time) {
      window.dispatchEvent(new CustomEvent("entraiot:appointment-updated"));
    }
  };

  const handlePanelPointerMove: PointerEventHandler<HTMLElement> = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePanelPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlayRoot}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.32 } }}
          role="dialog"
          aria-modal="true"
          aria-label="Entraiot immersive intro"
        >
          <div className={styles.backdrop} />

          <motion.section
            className={styles.panel}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onPointerMove={handlePanelPointerMove}
            onPointerLeave={handlePanelPointerLeave}
            style={{
              rotateX,
              rotateY,
              transformPerspective: 1200,
            }}
          >
            <button
              type="button"
              className={styles.closeButton}
              onClick={handleClose}
              aria-label="Close intro overlay"
            >
              <X size={18} />
            </button>

            <div className={styles.contentGrid}>
              <section className={styles.centerPane}>
                <h1 className={styles.heroTitle}>
                  <span>Create your</span>
                  <span className={styles.heroHighlight}>Smart Automation Story</span>
                </h1>
                <p className={styles.heroSubtitle}>
                  Transform your business with intelligent AI + IoT automation. Orchestrate smarter
                  workflows, unlock real-time insights, and accelerate growth with next-gen digital
                  intelligence built for high-performance teams.
                </p>

                <div className={styles.showcaseRow}>
                  <article className={styles.showcaseCard}>
                    <div className={styles.showcaseImageWrap}>
                      <Image
                        src={SHOWCASE_CARD.image}
                        alt={SHOWCASE_CARD.title}
                        fill
                        className={styles.showcaseImage}
                        sizes="420px"
                      />
                      <div className="w-full px-4 pt-3 pb-2" aria-label="Connect with Entraiot Solutions">
                        <div className="flex flex-col items-center">
                          <div className="flex justify-center items-center gap-4">
                            <a
                              href="tel:+919944442061"
                              className={`${styles.showcaseContactButton} ${styles.contactCall}`}
                              aria-label="Call"
                            >
                              <PhoneCall className={styles.contactIcon} />
                            </a>

                            <a
                              href={EXTERNAL_BOOK_APPOINTMENT_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={handleBook}
                              className={`${styles.showcaseContactButton} ${styles.contactBook}`}
                              aria-label="Book Appointment"
                            >
                              <CheckCircle2 className={styles.contactIcon} />
                            </a>

                            <a
                              href="mailto:bde@entraiot.com"
                              className={`${styles.showcaseContactButton} ${styles.contactEmail}`}
                              aria-label="Email"
                            >
                              <Mail className={styles.contactIcon} />
                            </a>
                          </div>

                          <div className="mt-3">
                            <button type="button" className={styles.secondaryCta} onClick={handleSignUp}>
                              Sign Up
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>

                {/* contactRow intentionally removed from left section to sit with CTAs */}
              </section>

              <section className={styles.leftPane}>
                <article className={styles.calendarCard}>
                  <div className={styles.calendarHeader}>
                    <button
                      type="button"
                      className={styles.monthNav}
                      onClick={() =>
                        setDisplayMonth(
                          (current) => new Date(current.getFullYear(), current.getMonth() - 1, 1)
                        )
                      }
                      aria-label="Previous month"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <h2>{monthLabel}</h2>
                    <button
                      type="button"
                      className={styles.monthNav}
                      onClick={() =>
                        setDisplayMonth(
                          (current) => new Date(current.getFullYear(), current.getMonth() + 1, 1)
                        )
                      }
                      aria-label="Next month"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className={styles.weekRow}>
                    {WEEK_DAYS.map((day) => (
                      <span key={day}>{day}</span>
                    ))}
                  </div>

                  <div className={styles.dayGrid}>
                    {calendarCells.map((cell) => {
                      const isSelected = booking.date === cell.key;
                      const buttonClassName = [
                        styles.dayCell,
                        cell.isCurrentMonth ? styles.dayCurrent : styles.dayOutside,
                        cell.isToday ? styles.dayToday : "",
                        isSelected ? styles.daySelected : "",
                      ]
                        .filter(Boolean)
                        .join(" ");

                      return (
                        <button
                          key={cell.key}
                          type="button"
                          className={buttonClassName}
                          onClick={() => handleDateSelect(cell)}
                        >
                          {cell.day}
                        </button>
                      );
                    })}
                  </div>
                </article>

                <article className={styles.timeCard}>
                  <h2>Appointment slot</h2>
                  <div className={styles.timePickerWrap}>
                    <button
                      type="button"
                      className={`${styles.timeToggle} ${isTimePickerOpen ? styles.timeToggleOpen : ""}`}
                      onClick={() => setIsTimePickerOpen((current) => !current)}
                      aria-expanded={isTimePickerOpen}
                      aria-controls="time-slot-dropdown"
                    >
                      <span>{booking.time ? `Time: ${booking.time}` : "Select Time"}</span>
                      <ChevronDown size={16} className={styles.timeToggleIcon} />
                    </button>

                    <AnimatePresence initial={false}>
                      {isTimePickerOpen ? (
                        <motion.div
                          id="time-slot-dropdown"
                          className={styles.timeDropdown}
                          initial={{ opacity: 0, scale: 0.97, y: -6 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.98, y: -4 }}
                          transition={{ duration: 0.2, ease: ENTER_EASE }}
                        >
                          <div className={styles.timeSlots}>
                            {TIME_SLOTS.map((slot) => (
                              <button
                                key={slot}
                                type="button"
                                className={`${styles.timeSlot} ${booking.time === slot ? styles.timeSlotSelected : ""}`}
                                onClick={() => handleTimeSelect(slot)}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div className={styles.selectionSummary}>
                    <span>{selectedDateLabel}</span>
                    <strong>{booking.time || "Select a time slot"}</strong>
                  </div>

                  <section className={styles.whatWeDo}>
                    <h3>What We Do</h3>
                    <div className={styles.whatWeDoList}>
                      {WHAT_WE_DO_ITEMS.map((item) => (
                        <article
                          key={item.title}
                          className={`${styles.whatWeDoItem} ${
                            item.tone === "iot"
                              ? styles.whatWeDoIot
                              : item.tone === "dashboards"
                                ? styles.whatWeDoDashboards
                                : item.tone === "predictive"
                                  ? styles.whatWeDoPredictive
                                  : item.tone === "automation"
                                    ? styles.whatWeDoAutomation
                                    : item.tone === "apps"
                                      ? styles.whatWeDoApps
                                      : styles.whatWeDoUiux
                          }`}
                        >
                          <h4>
                            <span className={styles.whatWeDoIconWrap} aria-hidden="true">
                              <CheckCircle2 className={styles.whatWeDoIcon} />
                            </span>
                            {item.title}
                          </h4>
                          <p>{item.description}</p>
                        </article>
                      ))}
                    </div>
                  </section>

                  <div className={styles.ctaRow}>
                    <div className={styles.primaryCtaGroup}>
                      <a
                        className={styles.primaryCta}
                        href={EXTERNAL_BOOK_APPOINTMENT_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleBook}
                      >
                        Book Appointment
                      </a>
                      <span className={styles.externalHint}>Opens in new tab</span>
                    </div>
                    <button type="button" className={styles.secondaryCta} onClick={handleSignUp}>
                      Sign Up
                    </button>
                  </div>

                  {/* contactRow moved to the showcase image overlay for visual balance */}

                  {validationMessage ? <p className={styles.validationText}>{validationMessage}</p> : null}
                </article>
              </section>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

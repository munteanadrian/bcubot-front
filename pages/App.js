import { BiLoaderCircle } from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import { FcCheckmark, FcCancel } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import axios from "axios";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function App() {
  const statusOptions = {
    none: (
      <>
        <div className="text-black/50">Please click start</div>
      </>
    ),
    booking: (
      <>
        <BiLoaderCircle className="animate-spin custom-spin" />
        Booking...
      </>
    ),
    deleting: (
      <>
        <BiLoaderCircle className="animate-spin custom-spin" />
        Deleting...
      </>
    ),
    deleted: (
      <>
        <FcCheckmark />
        Deleted!
      </>
    ),
    error: {
      alreadyBooked: (
        <>
          <FcCancel />
          Already have a booked seat
        </>
      ),
      invalidUser: (
        <>
          <FcCancel /> Invalid user credentials
        </>
      ),
      invalidUser: (
        <>
          <FcCancel /> Invalid user credentials
        </>
      ),
      noBookings: (
        <>
          <FcCancel /> No active bookings
        </>
      ),
    },
  };

  const [inProgress, setInProgress] = useState(false);

  const [rememberedId, setRememberedId] = useState(false);
  const [userID, setUserID] = useState("");
  const [status, setStatus] = useState(statusOptions.none);
  const [bookedSeat, setBookedSeat] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("user-id");
    if (storedId) {
      setUserID(storedId);
      setRememberedId(true);
    }
  }, []);

  const handleInputChange = (event) => {
    setUserID(event.target.value);
  };

  const handleRememberedIdChange = (event) => {
    setRememberedId(event.target.checked);
  };

  const submit = (event) => {
    event.preventDefault();
    setStatus(statusOptions.booking);

    if (rememberedId) {
      localStorage.setItem("user-id", userID);
    } else {
      localStorage.removeItem("user-id");
    }

    const client = { id: userID, pass: userID };
    setInProgress(true);

    axios
      .post("http://localhost:8080/book", client, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setInProgress(false);

        console.log(response.data);

        if (response.data == "OK") {
          axios.get("http://localhost:8080/bookedSeat").then((res) => {
            setBookedSeat(res.data);
            setStatus(
              <>
                <FcCheckmark /> Booked seat {bookedSeat}!
              </>
            );
          });
        } else if (response.data == "ALREADY_BOOKED") {
          setStatus(statusOptions.error.alreadyBooked);
        } else if (response.data == "INVALID_USER") {
          setStatus(statusOptions.error.invalidUser);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteBooking = (event) => {
    event.preventDefault();
    setStatus(statusOptions.deleting);

    if (rememberedId) {
      localStorage.setItem("user-id", userID);
    } else {
      localStorage.removeItem("user-id");
    }

    const client = { id: userID, pass: userID };
    setInProgress(true);

    axios
      .post("http://localhost:8080/delete", client, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setInProgress(false);

        if (response.data == "DELETED") {
          setStatus(statusOptions.deleted);
        } else if (response.data == "NO_BOOKING") {
          setStatus(statusOptions.error.noBookings);
        } else if (response.data == "INVALID_USER") {
          setStatus(statusOptions.error.invalidUser);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="bg-orangeGradient bg-cover font-inter h-screen w-screen flex items-center">
      <div className="bg-white w-11/12 lg:w-4/12 m-auto py-4 rounded-2xl shadow-md flex flex-col items-center gap-4 lg:gap-7">
        <div className="text-center flex flex-col w-full h-full justify-center items-center gap-3">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            <FaRobot className="text-9xl" />
          </motion.div>
          <motion.h1
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.1 }}
            className="text-7xl font-semibold uppercase"
          >
            bcubot
          </motion.h1>
          <motion.a
            href="http://aleph.bcucluj.ro:8991/"
            target="_blank"
            className="text-sm text-black/50"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            whileTap={{ scale: 0.98 }}
            whileHover={{
              backgroundColor: "rgb(251 146 60)",
              scale: "1.01",
              color: "#FFFFFF",
              padding: "0.3rem",
              borderRadius: "0.5rem",
            }}
          >
            @BCU Library, Cluj-Napoca, Romania
          </motion.a>
          <motion.p
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
            className="text-md text-center w-10/12 lg:w-6/12"
          >
            A simple bot that automates library seat bookings
          </motion.p>
        </div>

        <motion.form
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.4 }}
          onSubmit={submit}
          className="flex flex-col justify-center items-center gap-3"
        >
          <div className="flex flex-col justify-center items-center gap-2">
            <input
              onChange={handleInputChange}
              disabled={inProgress}
              value={userID}
              type="text"
              id="id"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg p-2.5 text-center focus:border-orange-500 focus:outline-orange-500 transition duration-300 disabled:bg-gray-200"
              placeholder="User ID"
              required
            />
            <label className="mx-auto flex items-center gap-2 transition duration-300 disabled:text-black/50">
              <input
                type="checkbox"
                disabled={inProgress}
                checked={rememberedId}
                onChange={handleRememberedIdChange}
                className="transition duration-300"
              />
              Remember ID
            </label>
          </div>
          <button
            disabled={inProgress}
            type="submit"
            className="bg-orange-400 rounded-lg py-2 px-4 flex justify-center text-white items-center gap-2 text-lg w-1/2 enabled:hover:bg-orange-500 enabled:hover:scale-105 transition duration-200 disabled:bg-gray-500"
          >
            <BsFillPlayCircleFill />
            Start
          </button>
          <button
            onClick={deleteBooking}
            className="text-sm disabled:opacity-50"
            type="button"
            disabled={inProgress}
          >
            Delete booking
          </button>
        </motion.form>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.5 }}
          className="flex flex-col items-center gap-3 lg:-mt-4"
        >
          <div className="flex flex-row items-center gap-2 py-2">{status}</div>
          <motion.a
            whileHover={{
              scale: 1.02,
              backgroundColor: "#121212",
              color: "#FFFFFF",
            }}
            className="border-2 cursor-pointer border-black rounded-lg py-2 px-4 mb-2 flex gap-2 items-center"
            href="https://github.com/munteanadrian"
            target="_blank"
          >
            <AiFillGithub className="text-xl" />
            <h1 className="font-semibold">See on Github</h1>
          </motion.a>
        </motion.div>
      </div>
    </div>
  );
}

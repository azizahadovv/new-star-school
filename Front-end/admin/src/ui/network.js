import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function NetworkChecker() {
    useEffect(() => {
        // Internet statusini tekshirish
        const checkOnlineStatus = () => {
            if (navigator.onLine) {
                toast.info("You are online!");
            } else {
                toast.info("You are offline!");
            }
        };

        // Tezlikni tekshirish funksiyasi
        const checkInternetSpeed = async () => {
            const start = new Date().getTime();
            try {
                // So'rov yuborish (bu Google'ga HEAD so'rov)
                await fetch("https://www.google.com", { method: 'HEAD' });
                const end = new Date().getTime();
                const duration = end - start;

                if (duration > 3000) { // Agar 3 soniyadan ko'p bo'lsa, past tezlik
                    toast.info("Your internet connection is slow.");
                } else {
                    toast.info("Your internet connection is good.");
                }
            } catch (error) {
                toast.error("Cannot check internet speed. Connection issue.");
            }
        };

        // Internet statusni kuzatish uchun event listener qo'shish
        window.addEventListener("online", checkOnlineStatus);
        window.addEventListener("offline", checkOnlineStatus);

        // Ilova ishga tushganda dastlabki statusni tekshirish
        checkOnlineStatus();
        checkInternetSpeed();

        // Event listenerlarni tozalash
        return () => {
            window.removeEventListener("online", checkOnlineStatus);
            window.removeEventListener("offline", checkOnlineStatus);
        };
    }, []);

    return (
        <div>
            <ToastContainer />
        </div>
    );
}

export default NetworkChecker;

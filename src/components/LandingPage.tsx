import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Smartphone, Monitor, Tablet, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isInstallable, isInstalled, promptInstall } = useInstallPrompt();

  useEffect(() => {
    // Mark that user has visited the landing page
    localStorage.setItem("hasVisitedLanding", "true");
  }, []);

  const handleInstallApp = async () => {
    if (isInstalled) {
      // If already installed, go to login
      navigate("/login");
      return;
    }

    if (isInstallable) {
      const success = await promptInstall();
      if (success) {
        // After successful installation, redirect to login
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        // If user dismissed the install prompt, go to login
        navigate("/login");
      }
    } else {
      // If not installable, show reason and go to login
      console.log("التثبيت غير متاح - الأسباب المحتملة:");
      console.log("- المتصفح لا يدعم PWA");
      console.log("- التطبيق مثبت مسبقاً");
      console.log("- يحتاج تفاعل أكثر مع الموقع");
      navigate("/login");
    }
  };

  const handleContinueInBrowser = () => {
    navigate("/login");
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80')",
      }}
    >
      {/* Enhanced Overlay with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-md"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-yellow-400/10 to-orange-500/10 blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-500/10 blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 py-4 mx-auto flex flex-col items-center min-h-screen justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          {/* Logo Section */}
          <motion.div
            className="flex justify-center mb-3 sm:mb-4 lg:mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-lg opacity-50 animate-pulse" />
                <img
                  src="/yacin-gym-logo.png"
                  alt="Amino Gym Logo"
                  className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 lg:h-24 lg:w-24 rounded-full shadow-2xl border-4 border-yellow-300/50 object-cover backdrop-blur-sm"
                />
              </div>
              <motion.h1
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mt-2 sm:mt-3 lg:mt-4 mb-1 sm:mb-2 lg:mb-3 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-400 bg-clip-text text-transparent px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Amino Gym
              </motion.h1>
              <motion.p
                className="text-slate-300 text-sm sm:text-base lg:text-lg font-medium text-center px-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                نظام إدارة الصالة الرياضية المتطور
              </motion.p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="bg-slate-800/90 backdrop-blur-2xl border border-slate-700/50 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:border-slate-600/60">
              <div className="p-4 sm:p-5 md:p-6 lg:p-7 space-y-3 sm:space-y-4 lg:space-y-5">
                <div className="text-center">
                  <motion.h2
                    className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-2 sm:mb-3 lg:mb-4 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent px-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    احصل على أفضل تجربة
                  </motion.h2>
                  <motion.p
                    className="text-slate-300 text-xs sm:text-sm lg:text-base mb-3 sm:mb-4 lg:mb-5 leading-relaxed px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    {isInstallable
                      ? "ثبت التطبيق على جهازك للحصول على تجربة سريعة ومحسنة مع إمكانية العمل بدون انترنت"
                      : "استمتع بتجربة محسنة للصالة الرياضية مع نظام إدارة متطور"}
                  </motion.p>
                </div>

                {/* Features */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-5"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-slate-700/50 rounded-lg">
                    <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 lg:mb-2 text-yellow-400" />
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
                      تطبيق محمول
                    </p>
                  </div>
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-slate-700/50 rounded-lg">
                    <Monitor className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 lg:mb-2 text-blue-400" />
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
                      يعمل بدون انترنت
                    </p>
                  </div>
                  <div className="text-center p-2 sm:p-3 lg:p-4 bg-slate-700/50 rounded-lg">
                    <Tablet className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 mx-auto mb-1 lg:mb-2 text-green-400" />
                    <p className="text-slate-300 text-xs sm:text-sm lg:text-base">
                      متوافق مع جميع الأجهزة
                    </p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  className="space-y-2 lg:space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  <Button
                    onClick={handleInstallApp}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold h-9 sm:h-10 lg:h-11 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Download className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                    {isInstalled
                      ? "فتح التطبيق"
                      : isInstallable
                        ? "تثبيت التطبيق"
                        : "متابعة للتطبيق"}
                  </Button>

                  <Button
                    onClick={handleContinueInBrowser}
                    variant="outline"
                    className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 h-9 sm:h-10 lg:h-11 text-sm sm:text-base lg:text-lg"
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 mr-2" />
                    متابعة في المتصفح
                  </Button>
                </motion.div>

                <motion.div
                  className="text-center text-slate-400 mt-3 sm:mt-4 lg:mt-5 border-t border-slate-700/50 pt-2 sm:pt-3 lg:pt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  <p className="text-slate-500 text-xs sm:text-sm lg:text-base">
                    © 2024 Amino Gym - جميع الحقوق محفوظة
                  </p>
                  <p className="text-slate-600 text-xs sm:text-xs lg:text-sm mt-1">
                    PWA مُحسّن • قابل للتثبيت • يعمل دون انترنت
                  </p>
                </motion.div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced Animated Blobs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 blur-3xl"
        animate={{
          x: [0, 30, 0],
          y: [0, 20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 blur-3xl"
        animate={{
          x: [0, -25, 0],
          y: [0, -15, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default LandingPage;

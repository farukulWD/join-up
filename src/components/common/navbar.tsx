"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Calendar, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "@/lib/auth-context";

import { useI18n } from "@/lib/i18n-context";
import { LanguageToggle } from "./language-toggle";
import AnimatedButton from "../animated-button";
import { ThemeToggle } from "./theme-toggle";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setLogout } from "@/redux/features/auth-slice";


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  console.log(isAuthenticated, user);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const { t } = useI18n();

  const navItems = [
    { href: "/", label: t("nav.home") },
    { href: "/events", label: t("nav.events"), protected: true },
    { href: "/add-event", label: t("nav.addEvent"), protected: true },
    { href: "/my-events", label: t("nav.myEvents"), protected: true },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.protected || (item.protected && isAuthenticated)
  );

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(setLogout());
    router.push("/login");
  };

  const NavLinks = ({ mobile = false, onItemClick = () => {} }) => (
    <>
      {filteredNavItems.map((item, index) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: mobile ? 20 : -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={item.href}
            className={`${
              mobile
                ? "block px-3 py-2 text-base font-medium"
                : "px-3 py-2 text-sm font-medium"
            } rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
              pathname === item.href
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground"
            }`}
            onClick={onItemClick}
          >
            <motion.span
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.span>
          </Link>
        </motion.div>
      ))}
    </>
  );

  return (
    <motion.nav
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Website Name */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/" className="flex items-center space-x-2">
              <Calendar className="h-6 w-6 text-primary" />

              <span className="text-xl font-bold">Join Up</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLinks />
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-2">
            {/* Theme and Language Toggles */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <ThemeToggle />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <LanguageToggle />
            </motion.div>

            <AnimatePresence mode="wait">
              {isAuthenticated && user ? (
                <motion.div
                  key="authenticated"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Button
                          variant="ghost"
                          className="relative h-8 w-8 rounded-full"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={user.photoURL || "/placeholder.svg"}
                              alt={user.name}
                            />
                            <AvatarFallback>
                              {user.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </Button>
                      </motion.div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-56"
                      align="end"
                      forceMount
                    >
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center justify-start gap-2 p-2"
                      >
                        <div className="flex flex-col space-y-1 leading-none">
                          <p className="font-medium text-sm text-muted-foreground">
                            {user.name}
                          </p>
                        </div>
                      </motion.div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        {t("nav.logout")}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ) : (
                <motion.div
                  key="unauthenticated"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <AnimatedButton asChild>
                    <Link href="/login">{t("nav.signIn")}</Link>
                  </AnimatedButton>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile menu button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <motion.div
                      animate={{ rotate: isOpen ? 90 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-5 w-5" />
                    </motion.div>
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </motion.div>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <motion.div
                  className="flex flex-col space-y-4 mt-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <NavLinks mobile onItemClick={() => setIsOpen(false)} />
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

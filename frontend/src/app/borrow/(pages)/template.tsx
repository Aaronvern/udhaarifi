"use client"
import React from "react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useTheme } from "@/context/themecontext";
import { useKeylessAccounts } from "@/core/useKeylessAccounts";
import {InnerParticlesComponent} from '@/components/Particles'
import { FaWallet } from "react-icons/fa";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineLocalOffer } from "react-icons/md";

export default function BorrowLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { activeAccount } = useKeylessAccounts()
    const { connected, isLoading } = useWallet();
    const { theme } = useTheme()
    const paths = [
        {
            name: "My Assets",
            to: "assets",
            icon: <FaWallet size={18} />
        },
        {
            name: "My Loans",
            to: "loans", 
            icon: <IoDocumentTextOutline size={20} />
        },
        {
            name: "Offers",
            to: "offers",
            icon: <MdOutlineLocalOffer size={20} />
        }
    ]
    return (
        <React.Fragment>
            <InnerParticlesComponent id="particles-bg"/>
            <section className={`inner-banner ${theme == 'light' ? 'light-theme' : 'dark-theme'}`}>
                <div className="container">
                    <div className="row">
                        <div className="col text-center">
                            <h2>Unlock Crypto Loans with Your NFTs</h2>
                            <p className="w-50 m-auto position-relative pt-3">Leverage your NFTs as collateral and access instant liquidity without selling your digital assets. Get quick, transparent loans today!</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`borrow-tabs py-100 ${theme == 'light' ? 'light-theme' : 'dark-theme'}`}>
                <div className="container">
                    <div className="row">
                        <div className="col d-flex box-main">
                            <div className="nav flex-column nav-pills me-4 tab-btns rounded" id="borrow-tabs" role="tablist" aria-orientation="vertical">
                                {
                                    paths.map((path, index) => (
                                        <Link
                                            href={`/borrow/${path.to}`}
                                            key={path.to}
                                            className={`tab-btn ${pathname.includes(path.to) ? 'active' : ''}`}
                                        >
                                            {path.icon}
                                            {path.name}
                                        </Link>
                                    ))
                                }
                            </div>
                            <div className="tab-content rounded">
                                {
                                    connected || activeAccount   ? (
                                        children
                                    ) : (
                                        <div className="cn-wallet text-center w-50 m-auto rounded">
                                            <h3>Connect Your Wallet First</h3>
                                            {isLoading ? (
                                                <button className="connect-btn mt-3 rounded">Connecting...</button>
                                            ) : (
                                                <button className="connect-btn mt-3 rounded" data-bs-toggle="modal" data-bs-target="#connectmodal">Connect wallet</button>
                                            )
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment >
    )
}
"use client"
import React from "react"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useTheme } from "@/context/themecontext";
import { useKeylessAccounts } from "@/core/useKeylessAccounts";
import { InnerParticlesComponent } from '@/components/Particles'

export default function LendLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { activeAccount } = useKeylessAccounts()
    const { connected, isLoading } = useWallet();
    const { theme } = useTheme()
    
    const paths = [
        {
            name: "Give a Loan",
            to: "assets"
        },
        {
            name: "Loans Given",
            to: "loans"
        },
        {
            name: "Offers Sent",
            to: "offers"
        }
    ]
    
    return (
        <React.Fragment>
            <InnerParticlesComponent id="particles-bg" />
            <div className="mt-32"> {/* Added large top margin container */}
                <section className="pt-16 pb-12 bg-transparent">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6 text-gold">
                                Empower Crypto Lending with NFTs
                            </h2>
                            <p className="text-lg mb-8 text-gold">
                                Offer loans backed by NFTs and earn attractive returns while helping others access instant liquidity without selling their digital assets. Start lending today!
                            </p>
                        </div>
                    </div>
                </section>
                
                <section className={`borrow-tabs py-100 ${theme === 'light' ? 'light-theme' : 'dark-theme'} bg-transparent`}>
                    <div className="container">
                        <div className="row">
                            <div className="col d-flex box-main">
                                <div className="nav flex-column nav-pills me-4 tab-btns rounded" id="borrow-tabs" role="tablist" aria-orientation="vertical">
                                    {paths.map((path, index) => (
                                        <Link 
                                            href={`/lend/${path.to}`} 
                                            className={`tab-btn ${pathname === `/lend/${path.to}` ? "active" : ""} text-gold`} 
                                            key={`borrow-path-${index}`} 
                                            scroll={false}
                                        >
                                            {path.name}
                                        </Link>
                                    ))}
                                </div>
                                
                                <div className="tab-content rounded bg-dark text-light">
                                    {connected || activeAccount ? (
                                        children
                                    ) : (
                                        <div className="cn-wallet text-center w-50 m-auto rounded bg-dark p-4">
                                            <h3 className="text-gold">Connect Your Wallet First</h3>
                                            {isLoading ? (
                                                <button className="connect-btn mt-3 rounded bg-gold text-dark">
                                                    Connecting...
                                                </button>
                                            ) : (
                                                <button 
                                                    className="connect-btn mt-3 rounded bg-gold text-dark" 
                                                    data-bs-toggle="modal" 
                                                    data-bs-target="#connectmodal"
                                                >
                                                    Connect wallet
                                                </button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </React.Fragment>
    )
}
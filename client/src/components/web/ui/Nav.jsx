import React, { useState } from "react";
import info from "../../../data/info.json";
// icon
import { FiUser } from "react-icons/fi";
import { MdFavoriteBorder } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { MdOutlineMenu } from "react-icons/md";
import { RiCloseLargeFill } from "react-icons/ri";

// logo
import arbicLogo from "../../../asset/img/arbic_logo.png";
//  script
import { clater } from "../../../hooks/script/clater";

// Api Data
import { useGetApi } from "../../../api/useGetApi";



export default function Nav() {
    const { jsonData: catagoryData } = useGetApi("catagory");
    const { jsonData: subCatagoryData } = useGetApi("subcatagory");
    const catagory = catagoryData.length > 0 ? catagoryData : [];
    const subCatagory = subCatagoryData.length > 0 ? subCatagoryData : [];
    console.log(subCatagory);

    const [openMenu, setOpenMenu] = useState(false);


    return (
        <>
            <div className="nav flex around medel">
                <div className="flex center medel">

                    <button onClick={() => setOpenMenu(true)} className="nav-listBtn active pcNone-Flex"><MdOutlineMenu /></button>

                </div>
                {/* Website name and logo  */}
                <div className="flex medel pointer">

                    <div>
                        <img className="arbic_logo" src={arbicLogo} alt="Arbic Logo" />
                    </div>
                    <span className="title golden">
                        {info.siteName}
                    </span>
                </div>






                <div className="flex center medel pcNone-Flex">
                    <button className="nav-listBtn">
                        <FiUser /> <span className="mbNone"> Login/Register</span>
                    </button>
                </div>


                <div className={`flex center medel mobileMenu ${openMenu ? "show" : "hide"}`}>
                    <div className="flex beet medel w100 pcNone-Flex">
                        <div></div>
                        <div onClick={() => setOpenMenu(false)} className="closeBtn">
                            <RiCloseLargeFill />
                        </div>
                    </div>
                    {
                        catagory.map((item) => (
                            <div key={item.id} className="openDrop">
                                <button className="nav-listBtn">{clater(item.name)}</button>

                                <div className="dropMenu flex center medel">

                                    <div>

                                        {
                                            subCatagory
                                                .filter((sub) => sub.catagory_id === item.id)
                                                .map((sub) => (
                                                    <button key={sub.id} className="nav-subBtn">
                                                        {sub.name}
                                                    </button>
                                                ))
                                        }
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>

                <div className="flex center medel mbBottomNav">
                    <button className="nav-listBtn">
                        <IoSearch />
                    </button>

                    <button className="nav-listBtn">
                        <MdFavoriteBorder />
                    </button>
                    <button className="nav-listBtn">
                        <LuShoppingBag />
                    </button>
                    <button className="nav-listBtn">
                        <FiUser /> <span className="mbNone"> Login/Register</span>
                    </button>
                </div>

            </div>
        </>
    )
}
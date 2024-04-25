import React, {useState, useEffect} from "react"
import styles from "./ProfileMain.module.css"
// import {useLocation, useNavigate} from "react-router"
// import {Pagination} from "../../../../Main/Pagination"
// import {useSearchParams} from "react-router-dom"
// import {PopUpProof} from "./components/PopUpProof"
import {UserInfo} from "./components/UserInfo"
// import {AddProof} from "./components/AddProof"

const ProfileMain = ({userData}) => {
    // const location = useLocation()
    // const navigate = useNavigate()
    // const [searchParams] = useSearchParams()
    // const idTalent = +location.pathname.replace("/profile/", "")
    // const pageURL = +searchParams.get("page")
    // const allProofs = useGetProofsQuery(
    //     {idTalent, page: pageURL},
    //     {
    //         refetchOnMountOrArgChange: true,
    //     }
    // )
    // const isPageNotZero = (allProofs.data && allProofs.data.totalPages) > 1

    // useEffect(() => {
    //     if (allProofs.isError || isNaN(pageURL) === true) {
    //         navigate(`/profile/${idTalent}`)
    //     }
    // }, [allProofs.isError, idTalent, navigate, pageURL, searchParams])

    return (
        <div className={styles.wrapper}>
            <UserInfo userData={userData} />
            {/* <AddProof
                idTalent={idTalent}
                localTalentID={data.id}
                setPoopUP={setAddProofPoopUP}
            />
            {allProofs.isSuccess && <Content allProofs={allProofs.data && allProofs} />}
            <PopUpProof
                vis={isAddProofPoopUP}
                setVis={setAddProofPoopUP}
                allProofsRefetch={allProofs.refetch}
            />
            {isPageNotZero && (
                <Pagination
                    totalPages={allProofs.data && allProofs.data.totalPages}
                    currentPage={pageURL}
                    url={`profile/${idTalent}?page`}
                    sx={{position: "relative", bottom: 0, transform: "translateX(-50%)"}}
                /> */}
            {/* )} */}
        </div>
    )
}

export {ProfileMain}
'use client'
import { useParams } from "next/navigation";

const Profile = () =>{
    const params = useParams();
    return(
        <div>
            <h1>{params?.username}</h1>
        </div>
    )
}
export default Profile;
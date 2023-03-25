import HttpRequest, { BigGetRequest, ProtectedUploadImage, UploadIdentityImage } from "./HttpRequest.js";
import Store from "../redux/store";
import { resolvePlugin } from "@babel/core";
import { setLikedPosts } from "../redux/slice/likeSlice.js";


export const me = async (token) => {
    const response = await HttpRequest.ProtectedGetRequest("auth/me", token);
    // console.log("Me: " + JSON.stringify(response));
    if (response.msg == "Completed") {
        return response
    }
}

export const isEmailExist = async (email: String) => {
    email = email || "";
    console.log("Checking email: " + email);
    const response = await HttpRequest.GetRequest("gets/isemailexists/" + email);
    return response.exists;
}

export const isUsernameExist = async (username: String) => {
    username = username || "";
    console.log("Checking username: " + username);
    const response = await HttpRequest.GetRequest("gets/isusernameexists/" + username);
    return response.exists;
}

export const isPhoneExist = async (phone: String) => {
    phone = phone || "";
    console.log("Checking phone: " + phone);
    const response = await HttpRequest.GetRequest("gets/isphoneexists/" + phone);
    return response.exists;
}

export const getVersion = async (name: String) => {
    const response = await HttpRequest.GetRequest("gets/version/" + name);
    return response;
}

export const getPermissions = async () => {
    const response = await HttpRequest.GetRequest("gets/permissions");
    return response;
}

export const getCities = async () => {
    const response = await BigGetRequest("cities");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getDistricts = async () => {
    const response = await BigGetRequest("districts");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getWards = async () => {
    const response = await BigGetRequest("wards");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getImageTypes = async () => {
    const response = await HttpRequest.GetRequest("gets/imagetypes");
    return response;
}

export const getVehicleBrands = async () => {
    const response = await BigGetRequest("vehiclebrands");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

export const getVehicleLineups = async () => {
    const response = await BigGetRequest("vehiclelineups");
    response.sort((a, b) => a.ID - b.ID)
    // console.log("Vehicle lineups: " + JSON.stringify(response));
    return response;
}

export const getVehicleTypes = async () => {
    const response = await HttpRequest.GetRequest("gets/vehicletypes");
    return response;
}

export const getVehicleConditions = async () => {
    const response = await HttpRequest.GetRequest("gets/vehicleconditions");
    return response;
}

export const getColors = async () => {
    const response = await BigGetRequest("colors");
    response.sort((a, b) => a.ID - b.ID)
    return response;
}

const getToken = () => {
    return Store.getState().auth.token;
}

export const GetPersonalInfo = async () => {
    let token = getToken();
    const infoResponse = await HttpRequest.ProtectedGetRequest("personal/info/get", token);
    const addressesResponse = await HttpRequest.ProtectedGetRequest("personal/address/get", token);
    // console.log("Personal info: " + JSON.stringify(infoResponse));
    // console.log("Personal addresses: " + JSON.stringify(addressesResponse));
    if (infoResponse && addressesResponse) {
        if (infoResponse.msg == "Completed" && addressesResponse.msg == "Completed") {
            let info = infoResponse.info;
            info.Addresses = addressesResponse.info;
            return info;
        }
    }
}

export const SetProfileImage = async (image: Object) => {
    const token = getToken();
    return await ProtectedUploadImage("personal/avatar/set", image, token);
}

export const SetPersonalInfo = async (name: String, birthday: String, gender: Number, phoneNumber: String, identificationNumber: String) => {
    const body = {
        Name: name || "",
        Birthday: birthday || "",
        Gender: gender || 0,
        Phone_number: phoneNumber || "",
        Identification_number: identificationNumber || ""
    }
    const token = getToken();
    const res = await HttpRequest.ProtectedPostRequest("personal/info/set", body, token);
    return res.msg == "Completed";
}

export const SetIdentityImage = async (frontImage: Object, backImage: Object) => {
    const token = getToken();
    return await UploadIdentityImage(frontImage, backImage, token);
}

export const SetPersonalAddress = async (addresses: Array) => {
    const token = getToken();
    const pros = [];
    addresses.forEach(address => {
        if (!address.IsTemporary && address.IsDeleted) {
            console.log("Deleting address: " + JSON.stringify(address));
            pros.push(HttpRequest.ProtectedDeleteRequest("personal/address/del/" + address.ID, token));
        } else if (!address.IsTemporary && !address.IsDeleted) {
            console.log("Updating address: " + JSON.stringify(address));
            const body = {
                detail: address.DetailAddress,
                city: address.City,
                district: address.District,
                ward: address.Ward,
            }
            pros.push(HttpRequest.ProtectedPutRequest("personal/address/set/" + address.ID, body, token));
        }
        else if (address.IsTemporary && !address.IsDeleted) {
            console.log("Adding address: " + JSON.stringify(address));
            const body = {
                detail: address.DetailAddress,
                city: address.City,
                district: address.District,
                ward: address.Ward,
            }
            pros.push(HttpRequest.ProtectedPostRequest("personal/address/add", body, token));
        }
    });
    const res = await Promise.all(pros);
    return res.every(r => r.msg == "Completed");
}

export const UploadPost = async (
    images: Array<Object>,
    title: String,
    content: String,
    price: Number,
    addressID: Number,
    vehicleName: String,
    vehicleOdometer: Number,
    vehicleLicensePlate: String,
    vehicleManufactureYear: Number,
    vehicleCubicPower: Number,
    vehicleBrandID: Number,
    vehicleLineupID: Number,
    vehicleTypeID: Number,
    vehicleConditionID: Number,
    vehicleColorID: Number,
) => {
    const token = getToken();
    const pros = [];
    images.forEach(image => {
        pros.push(ProtectedUploadImage("personal/post/image/new", image, token));
    });
    console.log("Uploading post images");
    const imageResponses = await Promise.all(pros);
    console.log("Image responses: " + JSON.stringify(imageResponses));
    if (imageResponses.every(imageResponse => imageResponse.msg == "Completed")) {
        const imageIDs = imageResponses.map(imageResponse => imageResponse.info);
        const body = {
            name: vehicleName,
            odometer: vehicleOdometer,
            license: vehicleLicensePlate,
            mnf: vehicleManufactureYear,
            cubic: vehicleCubicPower,
            brand: vehicleBrandID,
            lineup: vehicleLineupID,
            type: vehicleTypeID,
            condition: vehicleConditionID,
            color: vehicleColorID,
        }
        console.log("Uploading vehicle info");
        const vehicleInfoResponse = await HttpRequest.ProtectedPostRequest("personal/post/vehicle/new", body, token);
        console.log("Vehicle info response: " + JSON.stringify(vehicleInfoResponse));
        if (vehicleInfoResponse.msg == "Completed") {
            const vehicleID = vehicleInfoResponse.info;
            const body = {
                title: title,
                content: content,
                price: price,
                address: addressID,
                vehicleinfo: vehicleID,
                images: imageIDs,
            }
            console.log("Uploading post info");
            const postInfoResponse = await HttpRequest.ProtectedPostRequest("personal/post/new", body, token);
            console.log("Post info response: " + JSON.stringify(postInfoResponse));
            return postInfoResponse.msg == "Completed";
        }
    }

}


export const GetPersonalPost = async () => {
    const token = getToken();
    const postResponse = await HttpRequest.ProtectedGetRequest("personal/post/all", token);
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const GetPersonalPostDetail = async (ID) => {
    const token = getToken();
    const postResponse = await HttpRequest.ProtectedGetRequest("personal/post/" + ID, token);
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const GetPost = async (ID) => {
    const postResponse = await HttpRequest.GetRequest("search/post/" + ID);
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const GetUserInfo = async (ID) => {
    const infoResponse = await HttpRequest.GetRequest("search/user/" + ID);
    if (infoResponse.msg == "Completed") {
        return infoResponse.info;
    }
}

export const PostFilter = (
    title: string,
    page: Number,
    numperPage: Number,
    asc: Boolean,
    priceStart: Number,
    priceEnd: Number,
    brand: Number,
    lineup: Number,
    type: Number,
    color: Number,
    manufacturerYear: Number,
) => {
    const args = {
        string: title,
        page: page,
        numperpage: numperPage,
        order: asc ? "asc" : "desc",
        pricestart: priceStart,
        priceend: undefined,
        brand: brand,
        lineup: lineup,
        type: type,
        color: color,
        mnfyear: manufacturerYear,
    }
    const argsString = Object.keys(args).map(key => { if (args[key]) return `${key}=${args[key]}` });
    let stringBuilder = "";
    argsString.forEach(arg => {
        if (arg) stringBuilder += arg + "&";
    })
    // Remove last "&"
    stringBuilder = stringBuilder.substring(0, stringBuilder.length - 1);
    return stringBuilder;
}

export const GetAllPosts = async (args: string) => {
    const postResponse = await HttpRequest.GetRequest("search/post/all" + (args ? "?" + args : ""));
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const LikePost = async (ID) => {
    const token = getToken();
    const likeResponse = await HttpRequest.ProtectedPostRequest("personal/like/" + ID, {}, token);
    await UpdateLikedPost();
    return likeResponse.msg == "Completed";
}

export const UnlikePost = async (ID) => {
    const token = getToken();
    const unlikeResponse = await HttpRequest.ProtectedDeleteRequest("personal/like/" + ID, token);
    await UpdateLikedPost();
    return unlikeResponse.msg == "Completed";
}

export const GetLikedPosts = async () => {
    const token = getToken();
    const postResponse = await HttpRequest.ProtectedGetRequest("personal/like", token);
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const UpdateLikedPost = async () => {
    Store.dispatch(setLikedPosts(await GetLikedPosts()));
}

export const RatePost = async (PostID, ratingPoint, content) => {
    const token = getToken();
    const body = {
        ratingpoint: ratingPoint,
        content: content,
    }
    const rateResponse = await HttpRequest.ProtectedPostRequest("personal/rate/" + PostID, body, token);
    return rateResponse.msg == "Completed";
}

export const DeactivatePost = async (ID) => {
    const token = getToken();
    const deactivateResponse = await HttpRequest.ProtectedPostRequest("personal/post/deactivate" + ID, token);
    return deactivateResponse.msg == "Completed";
}

export const SoldPost = async (ID) => {
    const token = getToken();
    const soldResponse = await HttpRequest.ProtectedPostRequest("personal/post/sold" + ID, token);
    return soldResponse.msg == "Completed";
}

export const AppAdminGetPost = async (ID) => {
    const token = getToken();
    const postResponse = await HttpRequest.ProtectedGetRequest("admin/application/post/" + ID, token);
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const AppAdminGetInactivePost = async () => {
    const token = getToken();
    const postResponse = await HttpRequest.ProtectedGetRequest("admin/application/inactiveposts", token);
    if (postResponse.msg == "Completed") {
        return postResponse.info;
    }
}

export const AppAdminSetStatus = async (PostID, status, info) => {
    const token = getToken();
    const body = {
        status: status,
        info: info,
        post: PostID,
    }
    const postResponse = await HttpRequest.ProtectedPostRequest("admin/application/status/set", body, token);
    return postResponse.msg == "Completed";
}

export default { me, isEmailExist, isUsernameExist, isPhoneExist };
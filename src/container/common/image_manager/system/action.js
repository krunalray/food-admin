import axios from 'axios';
import cookie from 'react-cookie';
import * as config from '../../../../system/config';
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST';
export const SET_IMAGE_PATH = 'SET_IMAGE_PATH';
export const SET_VIDEO_LINK = 'SET_VIDEO_LINK';

export function getImageList(file_path, searchImages, callback) {
  return function(dispatch) {
    let url = `${config.MS_API}/admin/tool/image_manager/list`;

    if(searchImages.search_common_image === true) {
      url = `${config.MS_API}/admin/tool/common_image_manager/list`;
    }

    const request = axios.post(url, { 
      file_name : file_path, 
      search_common_image: searchImages.search_common_image, 
      search_common_image_page: (searchImages.search_common_image_page ? searchImages.search_common_image_page : null),
      filter_search: (searchImages.filter_search ? searchImages.filter_search : null),
      search_common_resource: (searchImages.search_common_resource ? searchImages.search_common_resource : null)
    }, {
      headers: { user: cookie.load('user') }
    })
    .then(response => {
      dispatch( { type: GET_IMAGE_LIST, payload: response } );
      callback(null, response);
    })
    .catch(error => {
      console.log("getImageList error>>>>>>>>>", error);
      callback(true, null)
    });
  }
}

export function setImagePath(path) {
  return {
    type: SET_IMAGE_PATH,
    payload: path
  };
}

export function insertImageFolder(folder_name, file_path, callback) {
   return function(dispatch) {
    const request = axios.post(`${config.MS_API}/store/service/image_manager/folder/insert`, { folder_name : folder_name, file_path: file_path }, {
      headers: { user: cookie.load('user') }
    })
    .then(response => {
        //console.log(response);
        callback(null, response);
      })
      .catch(error => {
          //console.log(error);
      });
   }
}

export function imageUpload(image, file_path, callback) {
   const data = new FormData();
   data.append('file', image);
   file_path = file_path.replace(/\//g,'.');
   if(file_path=="" || file_path==undefined) {
     file_path = "empty";
   }
   //console.log("file_path", file_path);
   return function(dispatch) {
   const request = axios.post(`${config.MS_API}/store/service/image_manager/upload/${file_path}`, data, {
      headers: { user: cookie.load('user') }
    })
    .then(response => {
        //console.log("Success",response);
        callback(null, response.data);
      })
      .catch(error => {
          alert(error.data.error);
          //console.log("Error",error);
      });
   }
}

export function deleteImage(file_name, file_path, callback) {
   return function(dispatch) {
    const request = axios.post(`${config.MS_API}/store/service/image_manager/delete`, { file_name : file_name , file_path : file_path }, {
      headers: { user: cookie.load('user') }
    })
    .then(response => {
        //console.log(response);
        callback(null, response);
      })
      .catch(response => {
          //console.log(response);
      });
   }
}

// Add VIdeo link
export function setdVideoLink(formProps, callback){
  return function(dispatch) {
    dispatch( { type: SET_VIDEO_LINK, payload: formProps } );
  };
}

// for seller
// export function getImageList(file_path, seller_id, callback) {
//   return function(dispatch) {
//     const request = axios.post(`${config.MS_API}/seller/tool/image_manager/list`, { file_name : file_path, seller_id: seller_id }, {
//       headers: { user: cookie.load('seller') }
//     })
//     .then(response => {
//       dispatch( { type: GET_IMAGE_LIST, payload: response } );
//       callback(null, response);
//     })
//     .catch(error => {
//       //console.log(error);
//     });
//   }
// }
//
// export function insertImageFolder(folder_name, file_path, seller_id, callback) {
//    return function(dispatch) {
//     const request = axios.post(`${config.MS_API}/seller/service/image_manager/folder/insert`, { folder_name : folder_name, file_path: file_path, seller_id: seller_id }, {
//       headers: { user: cookie.load('seller') }
//     })
//     .then(response => {
//         //console.log(response);
//         callback(null, response);
//       })
//       .catch(error => {
//           //console.log(error);
//       });
//    }
// }
//
// export function imageUpload(image, file_path, seller_id, callback) {
//    const data = new FormData();
//    data.append('file', image);
//    file_path = file_path.replace(/\//g,'.');
//    if(file_path=="" || file_path==undefined) {
//      file_path = "empty";
//    }
//    //console.log("file_path", file_path);
//    return function(dispatch) {
//    const request = axios.post(`${config.MS_API}/seller/service/image_manager/upload/${file_path}/${seller_id}`, data, {
//       headers: { user: cookie.load('seller') }
//     })
//     .then(response => {
//         //console.log("Success",response);
//         callback(null, response);
//       })
//       .catch(error => {
//           alert(error.data.error);
//           //console.log("Error",error);
//       });
//    }
// }
//
// export function deleteImage(file_name, file_path, seller_id, callback) {
//    return function(dispatch) {
//     const request = axios.post(`${config.MS_API}/seller/service/image_manager/delete`, { file_name : file_name , file_path : file_path, seller_id: seller_id }, {
//       headers: { user: cookie.load('seller') }
//     })
//     .then(response => {
//         //console.log(response);
//         callback(null, response);
//       })
//       .catch(response => {
//           //console.log(response);
//       });
//    }
// }
// end seller

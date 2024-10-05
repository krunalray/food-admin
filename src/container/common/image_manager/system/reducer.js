import {
  GET_IMAGE_LIST,
  SET_IMAGE_PATH,
  SET_VIDEO_LINK
} from './action';

const INITIAL_STATE =  {
  settings: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_IMAGE_LIST:
      return { ...state, images: action.payload.data }
    case SET_IMAGE_PATH:
      return { ...state, image_path: action.payload }
    case SET_VIDEO_LINK:
      return { ...state, set_video_link: action.payload }
    default:
      return state;
  }
}

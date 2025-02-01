

import React, { useState, useEffect } from 'react';
import "./playvideo.css";
import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { API_KEY, value_convertor } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const Playvideo = () => {
    const {videoId}=useParams()
  const [channelData, setChannelData] = useState(null);
  const [apiData, setApiData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  // Fetch video data
  const fetchVideoData = async () => {
    try {
      const videoDetailUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetailUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  // Fetch channel and comment data
  const fetchOtherData = async () => {
    if (!apiData) return;

    try {
      // Fetch channel data
      const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const channelResponse = await fetch(channelUrl);
      const channelData = await channelResponse.json();
      if (channelData.items && channelData.items.length > 0) {
        setChannelData(channelData.items[0]);
      }

      // Fetch comment data
      const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=60&videoId=${videoId}&key=${API_KEY}`;
      const commentResponse = await fetch(commentUrl);
      const commentData = await commentResponse.json();
      setCommentData(commentData.items || []);
    } catch (error) {
      console.error("Error fetching additional data:", error);
    }
  };

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

  return (
    <div className="play-video">
      {/* Video Embed */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Video Player"
      ></iframe>

      {/* Video Title */}
      <h3>{apiData?.snippet?.title || "Loading title..."}</h3>

      {/* Video Info */}
      <div className="play-video-info">
        <p>
          {apiData ? value_convertor(apiData.statistics.viewCount) : "0"} views &bull; {moment(apiData?.snippet?.publishedAt).fromNow() || "Unknown"}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" />
            {apiData ? value_convertor(apiData.statistics.likeCount) : "0"}
          </span>
          <span>
            <img src={dislike} alt="Dislike" />
          </span>
          <span>
            <img src={share} alt="Share" /> Share
          </span>
          <span>
            <img src={save} alt="Save" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* Channel Info */}
      <div className="publisher">
        <img
          src={channelData?.snippet?.thumbnails?.default?.url || ""}
          alt="Channel Thumbnail"
        />
        <div>
          <p>{apiData?.snippet?.channelTitle || "Unknown Channel"}</p>
          <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : "0"} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Video Description */}
      <div className="vid-description">
        <p>{apiData?.snippet?.description?.slice(0, 250) || "No description available."}</p>

        <hr />

        {/* Comments Section */}
        <h4>{apiData ? value_convertor(apiData.statistics.commentCount) : "0"} Comments</h4>
        {commentData.map((item, index) => (
          <div key={index} className="comment">
            <img
              src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
              alt="Author"
            />
            <div>
              <h3>
                {item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
              </h3>
              <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
              <div className="comment-action">
                <img src={like} alt="Like" />
                <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                <img src={dislike} alt="Dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playvideo;

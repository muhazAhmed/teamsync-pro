import { useEffect, useState } from "react";
import "./style.css";
import { disabledClick, usePageName } from "../../utils/commonFunctions";
import Card from "../../UI-Components/Card/Card";
import { animatedIcon, icon } from "../../UI-Components/Icons/Icons";
import { Avatar, Tooltip } from "@nextui-org/react";
import userLogo from "../../assets/images/man.png";
import { feedPosts } from "../form/Demo";

const Feeds = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    usePageName("Feeds");
  }, []);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="feeds">
      <div className="posts-section">
        <Card
          boxShadow={false}
          id="new-post"
          content={
            <div className="new-post">
              <Tooltip content="Profile" className="btn-primary">
                <Avatar src={userLogo} size="md" className="cursor-pointer first-logo" />
              </Tooltip>
              <input placeholder="What's on your mind?" />
              <Tooltip content="Upload" className="btn-primary">
                <i
                  onClick={() => disabledClick("Uploading")}
                  className={icon?.image}
                  style={{ fontSize: "1.5rem", color: "gray" }}
                ></i>
              </Tooltip>
            </div>
          }
        />
        {feedPosts?.map((item: any) => (
          <Card
            style={{ marginBottom: "1rem" }}
            boxShadow={false}
            key={item?.id}
            content={
              <div className="posts">
                <div className="post-header">
                  <div className="post-username">
                    <Avatar
                      src={item?.profile}
                      size="md"
                      className="cursor-pointer"
                    />
                    <div>
                      <h4 style={{ fontWeight: "bold", fontSize: "16px" }}>
                        {item?.name}
                      </h4>
                      <span style={{ color: "gray", fontSize: "14px" }}>
                        {item?.date}
                      </span>
                    </div>
                  </div>
                  <Tooltip content="More" className="btn-primary">
                    <i className={icon?.ellipse}></i>
                  </Tooltip>
                </div>
                <p>{item?.caption}</p>
                <div className="post-img">
                  <img src={item?.image} loading="lazy" />
                </div>
                <div className="post-icons">
                  <div
                    className="icon-items"
                    onClick={() => setIsLiked(!isLiked)}
                  >
                    <Tooltip content="Like" className="btn-primary">
                      <i
                        className={isLiked ? icon?.likeAfter : icon?.likeBefore}
                        style={isLiked ? { color: "red" } : {}}
                      ></i>
                    </Tooltip>
                    <p>{item?.likes}</p>
                  </div>
                  <div className="icon-items">
                    <Tooltip content="Comment" className="btn-primary">
                      <i className={icon?.chat}></i>
                    </Tooltip>
                    <p>{item?.comments}</p>
                  </div>
                  <div className="icon-items">
                    <Tooltip content="Share" className="btn-primary">
                      <i className={icon?.share}></i>
                    </Tooltip>
                    <p>{item?.shares}</p>
                  </div>
                  <div className="icon-items">
                    <Tooltip content="Save" className="btn-primary">
                      <i className={icon?.bookmark}></i>
                    </Tooltip>
                    <p>{item?.saved}</p>
                  </div>
                </div>
                <div className="post-footer">
                  <div className="new-post">
                    <Tooltip content="Profile" className="btn-primary">
                      <Avatar
                        src={userLogo}
                        size="md"
                        className="cursor-pointer last-logo"
                      />
                    </Tooltip>
                    <input placeholder="Write your comment..." />
                    <Tooltip content="Send" className="btn-primary">
                      <i
                        onClick={handleLoading}
                        className={
                          loading
                            ? animatedIcon("spinner", "spin-pulse")
                            : icon?.send
                        }
                        style={{ fontSize: "1.3rem", color: "gray" }}
                      ></i>
                    </Tooltip>
                    <Tooltip content="Emoji" className="btn-primary">
                      <i
                        className={icon?.emoji}
                        style={{ fontSize: "1.3rem", color: "gray" }}
                      ></i>
                    </Tooltip>
                  </div>
                </div>
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default Feeds;

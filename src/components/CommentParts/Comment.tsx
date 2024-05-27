// import React from "react";

// function Comment() {
// 	return (
// 		<div key={comment._id} className="comment-container flex flex-col border-y-2 border-gray-200 w-[80vw] md:w-[65vw] px-2 py-3">
// 			<div className="user-info mb-3 flex gap-4 items-center">
// 				<div className="img-container w-[60px] h-[60px] rounded-full overflow-hidden">
// 					<img className="w-full h-full object-fit" src={defaultImg} alt="comment pfp" />
// 				</div>
// 				<div className="texts-container">
// 					<div className="flex items-center gap-3">
// 						<p className="font-semibold">{comment.user.username}</p>
// 						<div className="user-tags flex items-center gap-2">
// 							{user._id === comment.user._id && <p className="bg-[#e3801d] rounded-md px-3 text-white text-sm">YOU</p>}
// 							{comment.user._id === blog?.author._id && <p className="bg-[#89a02c] rounded-md px-3 text-white text-sm">OP</p>}
// 						</div>
// 					</div>
// 					<p className="text-gray-500">
// 						{formatDate(comment.date_posted)} {comment.edited && "(edited)"}
// 					</p>
// 				</div>
// 				{tokenActive && user._id === comment.user._id && (
// 					<div ref={(element) => moreOptionsContainerRefs.current.push(element)} className="more-options-container relative ml-auto -mt-5 cursor-pointer">
// 						<img onClick={() => toggleModal(comment._id)} className="w-[35px]" src={dotsSvg} alt="comment options modal" />
// 						{activeModalCommentId === comment._id && <CommentModal commentId={comment._id} refreshComments={refreshComments} comment={comment} handleEditComment={handleEditComment} />}
// 					</div>
// 				)}
// 			</div>
// 			<div className="comment-container flex">
// 				<div className="connector ml-7 -mt-1 border-l-2 border-b-2 w-[13px] h-[20px] border-[#d80a77]"></div>
// 				{editActive && activeEditCommentId === comment._id ? <EditForm commentId={activeEditCommentId} handleEditChange={handleEditCommentChange} editCommentText={editCommentText} setEditActive={setEditActive} refreshComments={refreshComments} /> : <p className="ml-3">{comment.text}</p>}
// 			</div>
// 			<div className="bottom-container flex items-center gap-2 mt-3 ">
// 				<CommentLikes comment={comment} refreshComments={refreshComments} />
// 				<CommentReplies comment={comment} refreshComments={refreshComments} />
// 			</div>
// 		</div>
// 	);
// }

// export default Comment;

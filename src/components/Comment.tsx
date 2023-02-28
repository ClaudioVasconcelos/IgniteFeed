import styles from "./Comment.module.css";

import { ThumbsUp, Trash } from "phosphor-react";
import { Avatar } from "./Avatar";
import { useState } from "react";

interface CommentProps {
	content: string;
	deleteComment: (comment: string) => void;
}

export function Comment(props:CommentProps) {
	const [likeCount, setLikeCount] = useState (0)

	function handleDeleteComment () {
		
		props.deleteComment(props.content)
	}

	function handleLikeComment () {
		setLikeCount(likeCount + 1)
	}

	return (
		<div className={styles.comment}>
			<Avatar
				hasBorder={false}
				src="https://github.com/claudiovasconcelos.png"
				alt=""
			/>

			<div className={styles.commentBox}>
				<div className={styles.commentContent}>
					<header>
						<div className={styles.authorAndTime}>
							<strong>Claudius Maxximus</strong>
							<time
								title="10 de Fevereiro de 2023 08:13h"
								dateTime="2023-02-10 08:13:00"
							>
								Cerca de 1h atrás
							</time>
						</div>

						<button onClick={handleDeleteComment} title="Deletar comentário">
							<Trash size={24} />
						</button>
					</header>

					<p>{props.content}</p>
				</div>

				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp />
						Aplaudir <span>{likeCount}</span>
					</button>
				</footer>
			</div>
		</div>
	);
}

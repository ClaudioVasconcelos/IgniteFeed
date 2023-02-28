import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import styles from "./Post.module.css";

// poderia usar a desestruturação do {props} e remover o props das propriedade, mas eu preferi deixar.

interface PostProps {
	author: {
		name: string;
		role: string;
		avatarUrl: string;
	};
	publishedAt: Date;
	content: Content[];
}
interface Content {
	type: "paragraph" | "Link";
	content: string;
}

export function Post(props: PostProps) {
	const [comments, setComments] = useState(["Muito legal !"]);
	const [newCommentText, setNewCommentText] = useState("");

	const publishedDateFormatted = format(
		props.publishedAt,
		"d 'de' LLLL 'ás' HH:mm'h'",
		{ locale: ptBR }
	);

	const publishedDateRelativeToNow = formatDistanceToNow(props.publishedAt, {
		locale: ptBR,
		addSuffix: true
	});

	function handleCreateNewComment(e: FormEvent) {
		e.preventDefault();

		// const newCommentText = e.target.comment.value;

		setComments([...comments, newCommentText]);
		setNewCommentText("");
	}

	function handleNewCommentChange(e: ChangeEvent<HTMLTextAreaElement>) {
		e.target.setCustomValidity("");
		setNewCommentText(e.target.value);
	}

	function deleteComment(commentToDelete: string) {
		const commentWithoutDeleteOne = comments.filter((comment) => {
			return comment !== commentToDelete;
		});
		setComments(commentWithoutDeleteOne);
	}

	function handleNewCommentInvalid(e: InvalidEvent<HTMLTextAreaElement>) {
		e.target.setCustomValidity("Esse campo é obrigatório!");
	}

	return (
		<article className={styles.post}>
			<header>
				<div className={styles.author}>
					<Avatar src={props.author.avatarUrl} alt="" />
					<div className={styles.authorInfo}>
						<strong>{props.author.name}</strong>
						<span>{props.author.role}</span>
					</div>
				</div>

				<time
					title={publishedDateFormatted}
					dateTime={props.publishedAt.toISOString()}
				>
					{publishedDateRelativeToNow}
				</time>
			</header>
			<div className={styles.content}>
				{props.content.map((line) => {
					if (line.type === "paragraph") {
						return <p key={line.content}>{line.content}</p>;
					} else if (line.type === "Link") {
						return (
							<p key={line.content}>
								<a href="#">{line.content}</a>
							</p>
						);
					}
				})}
			</div>
			<form
				onSubmit={handleCreateNewComment}
				className={styles.commentForm}
			>
				<strong>Deixe seu feedback</strong>
				<textarea
					name="comment"
					placeholder="Deixe um comentário"
					value={newCommentText}
					onChange={handleNewCommentChange}
					onInvalid={handleNewCommentInvalid}
					required
				></textarea>
				<footer>
					<button
						type="submit"
						disabled={newCommentText.length === 0}
					>
						Publicar
					</button>
				</footer>
			</form>
			<div className={styles.commentList}>
				{comments.map((comment) => {
					return (
						<Comment
							key={comment}
							content={comment}
							deleteComment={deleteComment}
						/>
					);
				})}
			</div>
		</article>
	);
}

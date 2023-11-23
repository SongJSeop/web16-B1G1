import { useEffect, useState } from 'react';
import { Button, Modal } from 'shared/ui';
import TextArea from 'shared/ui/textArea/TextArea';
import { ModalPortal } from 'shared/ui';
import { useViewStore } from 'shared/store/useWritingStore';
import styled from '@emotion/styled';
import Images from './Images';
import axios from 'axios';

export default function WritingModal() {
	const [text, setText] = useState('');
	const [files, setFiles] = useState<FileList | null>(null);
	const { setView } = useViewStore();

	return (
		<ModalPortal>
			<WritingModalLayout
				title="글쓰기"
				rightButton={
					<Button
						onClick={() => sendToServer(text, files)}
						size="m"
						buttonType="CTA-icon"
					>
						다음
					</Button>
				}
				leftButton={<Images onModify={setFiles} />}
				onClickGoBack={() => setView('DETAIL')}
			>
				<TextArea onChange={(text) => setText(text)} />
			</WritingModalLayout>
		</ModalPortal>
	);
}

const WritingModalLayout = styled(Modal)`
	transform: translate(-10%, -50%);
`;

const sendToServer = async (text: string, files: FileList | null) => {
	try {
		const formData = new FormData();
		formData.append('title', 'title');
		formData.append('text', text);
		if (files)
			for (let i = 0; i < files.length; i++) formData.append('image', files[i]);

		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		};
		const response = await axios.post(
			`http://www.별글.site/board`,
			formData,
			config,
		);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

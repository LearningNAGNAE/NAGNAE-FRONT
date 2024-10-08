import React from 'react';
import { useLocation } from 'react-router-dom';
import TextStudy from '../components/study/TextStudy';
import ImageStudy from '../components/study/ImageStudy';
import StudySideBar from '../components/study/StudySideBar';
import '../assets/styles/study/StudyPage.scss';

function StudyPage() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const type = queryParams.get('type') || 'text';

    const renderContent = () => {
        switch(type) {
            case 'text':
                return <TextStudy />;
            case 'image':
                return <ImageStudy />;
            default:
                return <TextStudy />;
        }
    };

    return (
        <div className="study-page">
            <StudySideBar />
            <div className="study-main-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default StudyPage;
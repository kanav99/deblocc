import * as React from 'react';
import { HStack } from './hstack';
import { defaultTheme } from './theme';
import { VStack } from './vstack';

interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
    show: boolean;
    heading: string;
    onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({show, children, onClose, ...props}) => {
    if (show) {
        return <div style={{
            position: "fixed", height: '100%', width: '100%', left: 0, top: 0, background: "rgba(0, 0, 0, 0.5)",
            alignItems: 'center', justifyContent: 'center', display: 'flex', zIndex: 10
        }}>
            <div style={{zIndex: 5, backgroundColor: defaultTheme.color.background, width: '40%', borderRadius: '10px' }}>
                <VStack flex>
                    <HStack style={{ justifyContent: 'space-between', fontFamily: defaultTheme.font.family, fontSize: '20px', fontWeight: 'semibold', paddingTop: '10px', paddingLeft: '20px', paddingRight: '20px'}}>
                        <div>{props.heading}</div>
                        <a className='undreline-link' onClick={onClose}>⨉</a>
                    </HStack>
                    <VStack style={{paddingBottom: '20px', paddingLeft: '20px', paddingRight: '20px'}}>
                        {children}
                    </VStack>
                </VStack>
            </div>
        </div>;
    }
    return null;
}
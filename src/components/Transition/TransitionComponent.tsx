'use client'
import { ReactNode, useContext, useRef } from "react";
import { SwitchTransition, Transition } from 'react-transition-group';
import { usePathname } from 'next/navigation';
import { pageTransitionEnter, pageTransitionExit } from '@/utils/animations/transitions';
import TransitionContext from '@/Context/TransitionContext';

interface TransitionProviderProps {
  children: ReactNode;
}

const TransitionComponent = ({ children }: TransitionProviderProps) => {
  const pathname = usePathname();
  const { toggleCompleted } = useContext(TransitionContext);
  const nodeRef = useRef(null);

  return (
    <SwitchTransition>
      <Transition
        key={pathname}
        nodeRef={nodeRef}
        timeout={800}
        mountOnEnter
        unmountOnExit
        onEnter={() => {
          pageTransitionEnter(nodeRef.current!, '#5CD19A', toggleCompleted);
        }}
        onExit={() => {
          pageTransitionExit(nodeRef.current!, '#F9EFE6');
        }}
      >
        <div ref={nodeRef}>
          {children}
        </div>
      </Transition>
    </SwitchTransition>
  );
};

export default TransitionComponent;
'use client';

import React, { useRef, useState, PropsWithChildren, useEffect } from 'react';
// 如果项目中有自己的 Button 组件，请引入，否则可以使用原生 button 替代
import { Button } from '@/components/ui/button';
import useUiStore from '@/store/ui';

interface Props extends PropsWithChildren {
  file: string;
}

export default function SelectableContainer(props: Props) {
  const { children, file } = props;
  const addSelectedCode = useUiStore(state => state.addSelectedCode);
  const rootRef = useRef<HTMLDivElement>(null);
  const dropdownContainerRef = useRef<HTMLDivElement>(null);

  // 控制下拉框的显示及对齐方式
  const [dropdownAlignLeft, setDropdownAlignLeft] = useState(true);
  const [dropdownAlignTop, setDropdownAlignTop] = useState(true);

  const selectedContent = useRef('');

  const doAddToChat = () => {
    const selection = window.getSelection();
    if (!rootRef.current || !selection) return;

    let startLine = Number.MAX_SAFE_INTEGER;
    let endLine = Number.MIN_SAFE_INTEGER;
    for (let i = 0, len = selection.rangeCount; i < len; i++) {
      const range = selection.getRangeAt(i);
      let startNode : Node | null = range.startContainer;
      let endNode = range.endContainer;

      // just in one element, like a span
      if (startNode === endNode
        && (startNode.nodeType === Node.TEXT_NODE || startNode.nodeName === 'SPAN')
      ) {
        const line = getLinePosition(startNode);
        startLine = Math.min(startLine, line);
        endLine = Math.max(endLine, line);
        continue;
      }

      startNode = startNode.nodeType === Node.TEXT_NODE ? startNode.parentNode as Node : startNode;
      startLine = Math.min(startLine, getLinePosition(startNode));
      endNode = endNode.nodeType === Node.TEXT_NODE ? endNode.parentNode as Node : endNode;
      endLine = Math.max(endLine, getLinePosition(endNode));
    }

    addSelectedCode(selectedContent.current, startLine, endLine, file);
    hideDropdown();
  };

  const onSelectionChange = (event?: React.MouseEvent<HTMLElement>) => {
    // 如果点击发生在下拉框内，则不做处理
    if (
      event &&
      dropdownContainerRef.current &&
      dropdownContainerRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    const selection = window.getSelection();
    if (!rootRef.current || !selection) return;

    selectedContent.current = selection.toString();
    if (
      !rootRef.current.contains(selection.anchorNode) ||
      !rootRef.current.contains(selection.focusNode)
    ) {
      return;
    }

    if (selection.rangeCount > 0 && selection.toString()) {
      const selectedRange = selection.getRangeAt(0);
      const range = selectedRange.cloneRange();
      range.collapse(true);
      const rootRect = rootRef.current.getBoundingClientRect();
      const rect = range.getBoundingClientRect();
      setDropdownAlignTop(rootRect.bottom - rect.bottom > 48);
      setDropdownAlignLeft(rootRect.right - rect.right > 128);
      if (range.endContainer !== dropdownContainerRef.current
        && !dropdownContainerRef.current?.contains(range.endContainer)) {
        range.insertNode(dropdownContainerRef.current!);
      }
      // 重新设置选区，避免下拉框被错误选中
      selection.removeAllRanges();
      selection.addRange(selectedRange);
    } else {
      hideDropdown();
    }
  };

  function onContentChange() {
    onSelectionChange();
  }

  function getLinePosition(node: Node): number {
    if (!rootRef.current) return -1;

    const codes = rootRef.current.querySelectorAll('span.line');
    while (node && node !== rootRef.current) {
      if (node.nodeType !== Node.ELEMENT_NODE
        || node.nodeName !== 'SPAN'
        || !(node as HTMLElement).classList.contains('line')
      ) {
        node = node.parentNode as Node;
        continue;
      }

      return Array.prototype.indexOf.call(codes, node) + 1;
    }
    return -1;
  }
  function hideDropdown() {
    if (dropdownContainerRef.current?.parentNode) {
      dropdownContainerRef.current.parentNode.removeChild(dropdownContainerRef.current);
    }
  }

  useEffect(() => {
    if (!rootRef.current || !dropdownContainerRef.current) return;

    rootRef.current.removeChild(dropdownContainerRef.current);
    dropdownContainerRef.current.classList.remove('hidden');
    dropdownContainerRef.current.classList.add('inline-block');
  }, []);

  return (
    <div
      ref={rootRef}
      className="text-block cursor-text"
      onInput={onContentChange}
      onMouseUp={onSelectionChange}
    >
      {children}
      <div
        ref={dropdownContainerRef}
        className="selected-dropdown-container relative z-10 select-none hidden"
      >
        <div
          className={`absolute w-fit z-50 select-none ${
            dropdownAlignLeft ? 'left-0' : 'right-0'
          } ${dropdownAlignTop ? 'top-full' : 'bottom-0'}`}
        >
          <Button
            aria-label="Add to chat"
            className="select-none add-to-chat-button"
            type="button"
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              doAddToChat();
            }}
          >
            Add to Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

import { S3FolderList } from '@/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { readDir } from '@/services/s3';
import { trimPrefix } from '@/utils';
import { clsx } from 'clsx';

interface FileTreeViewProps {
  className?: string;
  folderList: S3FolderList;
  isRoot?: boolean;
  onSelectFile: (file: string) => void;
  prefix: string;
  selectedFile: string;
}

export default function FileTreeView({
  className = '',
  folderList,
  isRoot = true,
  onSelectFile,
  prefix,
  selectedFile,
}: FileTreeViewProps) {
  const {
    folders,
    files,
  } = folderList;
  const root = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [subFolders, setSubFolders] = useState<Record<string, S3FolderList>>({});

  function doToggleDropdown() {
    setIsOpen(prev => !prev);
  }
  function onBodyClick(event: MouseEvent) {
    if (!root.current) return;
    if (!root.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }
  async function onOpen(prefix: string) {
    if (subFolders[ prefix ]) return;

    setIsLoading({
      ...isLoading,
      [ prefix ]: true,
    });
    const folderList = await readDir(prefix);
    setSubFolders({
      ...subFolders,
      [ prefix ]: folderList,
    });
    setIsLoading({
      ...isLoading,
      [ prefix ]: false
    });
  }

  useEffect(() => {
    if (isRoot) document.body.addEventListener('click', onBodyClick);

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  return (
    <div
      className={clsx('relative font-mono', className)}
      ref={root}
    >
      {isRoot && <button
        className="w-full flex justify-between items-center px-3 h-10 bg-white border border-black rounded-lg sm:hidden text-sm"
        type="button"
        onClick={doToggleDropdown}
      >
        <span className="truncate flex-1 text-start">{selectedFile.split('/').pop()}</span>
        <ChevronDown size={16} />
      </button>}
      <div
        className={clsx(
          'sm:block file-tree bg-white',
          isOpen ? 'absolute top-11 left-0 w-full z-50 max-h-48 shadow-md' : 'hidden',
          { 'p-3 border border-black rounded-lg': isRoot },
        )}
      >
        {folders.map((folder) => (
          <Collapsible
            key={folder.Prefix}
            onOpenChange={(open) => open && onOpen(folder.Prefix)}
          >
            <CollapsibleTrigger asChild>
              <Button
                className="flex justify-start gap-1 px-2 w-full truncate"
                variant="ghost"
              >
                {isLoading[ folder.Prefix ]
                  ? <Spinner className="w-4 h-4" />
                  : <ChevronRight
                    className="transition chevron-right"
                    size={16}
                  />
                }
                {trimPrefix(folder.Prefix, prefix)}
              </Button>
            </CollapsibleTrigger>

            <CollapsibleContent>
              {subFolders[ folder.Prefix ] && <FileTreeView
                className="ps-4"
                folderList={subFolders[ folder.Prefix ]}
                isRoot={false}
                onSelectFile={onSelectFile}
                prefix={folder.Prefix}
                selectedFile={selectedFile}
              />}
            </CollapsibleContent>
          </Collapsible>
        ))}
        {files.map((file) => (
          <Button
            key={file.Key}
            className="flex justify-start px-2 w-full text-sm truncate"
            variant={selectedFile === file.Key ? 'default' : 'ghost'}
            onClick={() => onSelectFile(file.Key)}
          >
            {trimPrefix(file.Key, prefix)}
          </Button>
        ))}
      </div>
    </div>
  );
}

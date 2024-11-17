import { S3FolderList } from '@/types';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Spinner } from '@/components/ui/spinner';
import { readDir } from '@/services/s3';
import { trimPrefix } from '@/utils';
import { clsx } from 'clsx';

interface FileTreeViewProps {
  className?: string;
  folderList: S3FolderList;
  onSelectFile: (file: string) => void;
  prefix: string;
  selectedFile: string;
}

export default function FileTreeView({
  className = '',
  folderList,
  onSelectFile,
  prefix,
  selectedFile,
}: FileTreeViewProps) {
  const {
    folders,
    files,
  } = folderList;
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
  const [subFolders, setSubFolders] = useState<Record<string, S3FolderList>>({});

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

  return (
    <div className={clsx('file-tree font-mono', className)}>
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
  );
}

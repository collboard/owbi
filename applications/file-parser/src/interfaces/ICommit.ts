import { id, semanticVersion } from './semanticTypes';

export interface ICommit<T> {
    treeId: id;

    commitId: id;

    previousId?: id;

    module: string;

    moduleVersion: semanticVersion;

    operationName?: string;

    operationId?: id;

    author: string;

    created: Date;

    data: T;
}

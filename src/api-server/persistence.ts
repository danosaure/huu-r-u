import { open } from '../persistence';
import { DB_NAME, DB_VERSION } from './constants';
import { migrations } from './migrations';

const persistence = async (): Promise<IDBDatabase> => open(DB_NAME, DB_VERSION, migrations);

export default persistence;

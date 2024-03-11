import { Entity, PrimaryColumn, Column } from 'typeorm';
import { generate as shortUuid } from 'short-uuid';

@Entity()
export class User {
    @PrimaryColumn('varchar', { length: 8 })
    id: string = shortUuid().slice(0, 8);

    @Column({ unique: true })
    email: string;

    @Column()
    fullName: string;

    @Column({ nullable: true })
    picture?: string;

    @Column({ default: true })
    isActive: boolean;
}

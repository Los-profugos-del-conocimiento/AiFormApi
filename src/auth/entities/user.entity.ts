import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm';
import { Form } from '../../form/entities/form.entity';
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

    @OneToMany(() => Form, form => form.user, { onDelete: 'CASCADE' })
    forms: Form[];
}

import {MigrationInterface, QueryRunner} from "typeorm";

export class AddRelationshipsInUserAndAppointment1613085894405 implements MigrationInterface {
    name = 'AddRelationshipsInUserAndAppointment1613085894405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "date" TIMESTAMP NOT NULL, "provider_id" integer, "user_id" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_378ea106aad574466ce9c50b365" FOREIGN KEY ("provider_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_15d50a87502380623ff0c27e458" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_15d50a87502380623ff0c27e458"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_378ea106aad574466ce9c50b365"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
    }

}

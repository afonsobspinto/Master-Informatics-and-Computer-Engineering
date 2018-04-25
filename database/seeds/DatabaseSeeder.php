<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
     public function run()
     {
         Eloquent::unguard();

         $path = 'SQL_Files/database.sql';
         DB::unprepared(file_get_contents($path));

         $path = 'SQL_Files/indexes.sql';
         DB::unprepared(file_get_contents($path));

         $path = 'SQL_Files/triggers.sql';
         DB::unprepared(file_get_contents($path));

         $path = 'SQL_Files/populate.sql';
         DB::unprepared(file_get_contents($path));

         $this->command->info('Database seeded!');
     }
}

import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-finalidad',
  imports: [Navbar, Banner, Footer],
  templateUrl: './finalidad.html',
  styleUrl: './finalidad.scss',
})
export class FinalidadComponent {}

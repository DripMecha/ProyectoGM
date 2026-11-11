import { Component } from '@angular/core';
import { Navbar } from '../../shared/navbar/navbar';
import { Banner } from '../../shared/banner/banner';
import { Footer } from '../../shared/footer/footer';

@Component({
  selector: 'app-desarrolladores',
  imports: [Navbar, Banner, Footer],
  templateUrl: './desarrolladores.html',
  styleUrl: './desarrolladores.scss',
})
export class DesarrolladoresComponent {}
